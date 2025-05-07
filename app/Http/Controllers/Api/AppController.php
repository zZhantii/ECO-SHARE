<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Trip;
use App\Models\User;
use App\Models\Reserve;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;


class AppController extends Controller
{

    //Método que consigue todos los vehículos del usuario autenticado
    public function indexVehicle()
    {
        $user = Auth::user();
        $vehicle = Vehicle::where("user_id", $user->id)->get();
        return response()->json(["success" => true, "data" => $vehicle], 200);

    }

    //Método para iniciar el viaje por parte del conductor
    public function startDrive($id)
    {
        $trip = Trip::find($id);


        // Se hacen comprobaciones de si el viaje ya ha comenzado, si ha finalizado, si se ha cancelado de forma pervia,

        if (!empty($trip->drive_end)) {
            return response()->json(["success" => false, "data" => "El viaje ya ha terminado"], 400);
        }
        if (!empty($trip->drive_start)) {
            return response()->json(["success" => false, "data" => "El viaje ya ha comenzado"], 400);
        }
        if (!empty($trip->cancelled_at)) {
            return response()->json(["success" => false, "data" => "El viaje ha sido cancelado previamente"], 400);
        }

        //Aquí comprovamos sii el viaje ha comenzado desde la hora de salida y una hora de margen adicional
        $departure = Carbon::parse($trip->departure_time);
        $lastCall = $departure->copy()->addHour();

        if (!now()->between($departure, $lastCall)) {
            return response()->json(["success" => false, "data" => "El viaje debía inicirase entre {$departure} y {$lastCall}."], 400);
        }
        $price = $trip->price;
        $totalSeatsReserved = $trip->reserves()->whereNotNull("check_in")->sum('seats_reserved');

        // Revisamos si hay pasajeros asociados a la reserva, en caso contrario no se deja iniciar el viaje
        if ($totalSeatsReserved == 0) {
            return response()->json(["success" => false, "data" => "No tienes pasajeros confirmados para realizar el viaje."], 400);
        }

        // A continuación, con todos los pasajeros que han hecho checkin, se dividen los gastos del viaje y se hace un 
        // insert en la tabla intermedia de reservas
        $averagePricePerSeat = round($price / $totalSeatsReserved, 2);


        $reserves = $trip->reserves()->whereNotNull("check_in")->get();

        foreach ($reserves as $reserve) {

            $totalPrice = round($averagePricePerSeat * $reserve->pivot->seats_reserved, 2);

            $trip->reserves()->updateExistingPivot($reserve->id, [
                'total_price' => $totalPrice
            ]);
        }

        $trip->drive_start = now();
        $trip->save();

        return response()->json(["success" => true, "data" => $trip], 200);




    }

    //Método para finalizar el viaje
    public function endDrive($id)
    {
        $trip = Trip::find($id);

        // Se comprueba si el viaje se ha iniciado previamente o si ha sido cancelado
        if (empty($trip->drive_start && empty($trip->cancelled_at))) {

            return response()->json(["success" => false, "data" => "El viaje no ha sido iniciado"], 400);
        } else {
            // Se comprueba si el viaje no ha sido finalizado ya
            if (!empty($trip->drive_end)) {
                return response()->json(["success" => false, "data" => "El viaje ya ha sido finalizado anteriormente."], 400);

            } else {
                $trip->drive_end = now();
                $trip->save();
                return response()->json(["success" => true, "data" => $trip], 200);
            }
        }



    }

    //Método para el registro del check-in del usuario
    public function checkIn(Request $request)
    {

        $user = Auth::user();

        $trip = $user->reserves()->select("trips.cancelled_at", "trips.drive_start", "trips.departure_time", )->where("trip_id", $request->id)->first();


        // Comprobaremos pooara hacer checkin que el viaje no se haya inciado ya, que no haya sido cancelado por el conductor
        // o por el usuario, que no se haya hecho checkin previamente y que el checkin se realiaz dentro de la hora
        // anterior al inicio del viaje
        if (!empty($trip->drive_start)) {
            return response()->json(["success" => false, "data" => "El viaje ya ha comenzado y no se puede hacer check-in."], 400);
        }

        if (!empty($trip->cancelled_at)) {
            return response()->json(["success" => false, "data" => "El viaje ha sido cancelado previamente por parte del conductor."], 400);
        }
        if (!empty($trip->pivot->cancelled_at)) {
            return response()->json(["success" => false, "data" => "El viaje ha sido cancelado previamente por parte del pasajero."], 400);
        }
        if (!empty($trip->pivot->check_in)) {
            return response()->json(["success" => false, "data" => "El check-in ya se ha realizado con anterioridad."], 400);
        }
        $departure = Carbon::parse($trip->departure_time);
        $startCheckIn = $departure->copy()->subHour();
        if (!now()->between($startCheckIn, $departure)) {
            return response()->json([
                "success" => false,
                "data" => "El check-in debia realizarse entre $startCheckIn y $departure."
            ], 400);
        }
        $user->reserves()->updateExistingPivot($request->id, [
            'check_in' => now()
        ]);

        $reserve = $user->reserves()->where('trip_id', $request->id)->first();


        return response()->json(["success" => true, "data" => $reserve], 200);

    }

    //Método que recoge los viajes activos como conductor
    public function indexDriverTrips(Request $request)
    {

        $user = Auth::user();

        // Se cosiguen todos los viajes del usuario como conductor dentro de un marco horario que llega hasta una hora después
        // del momento de salida del viaje. También se comprueba que el viaje no haya sido cancelado o finalizado
        $trips = Trip::where("user_id", $user->id)
            ->where(DB::raw("departure_time + INTERVAL 1 HOUR"), '>=', now())
            ->whereNull("cancelled_at")
            ->whereNull("drive_end")
            // Se cogen los datos del vehículo y de la reserva para completar los detalles del viaje y se devueven
            ->with("vehicle")->with("reserves")->get();

        return response()->json(["suceess" => True, "data" => $trips], 200);
    }

    //Método que recoge los viajes activos como pasajero
    public function indexPassengerTrips(Request $request)
    {


        $user = Auth::user();

        // Se cargan viajes activos comprobando que el viaje no se haya cancelado por conductor o pasajero,
        // que la hora sea inferior a la hora de salida, o cuando el viaje se ha iniciado pero ya se haya
        // hecho el checkin y la hora sea inferior al tiempo estimado de llegada
        $reserves = $user->reserves()
            ->where(function ($query) {
                $query->where(function ($q) {
                    $q->where("trips.departure_time", '>=', now())
                        ->whereNull("trips.drive_end")
                        ->whereNull("trips.cancelled_at")
                        ->whereNull("user_trips_reserves.cancelled_at");
                })
                    ->orWhere(function ($q) {
                        $q->whereNotNull("user_trips_reserves.check_in")
                            ->whereNotNull("trips.drive_start")
                            ->whereNull("trips.drive_end")
                            ->where('trips.arrival_time', '>', now());
                    });
            })
            // Se cogen los datos de las relaciones de vehiculo y de usuario para completar los detalles del conductor para
// información del pasajero.
            ->with([
                'vehicle:id,brand,model,plate',
                'user:id,alias',
            ])
            ->get();

        return response()->json(["suceess" => True, "data" => $reserves], 200);
    }

    //Método para cancelar el viajr como conductor
    public function cancelDriverTrip($id)
    {
        $trip = Trip::find($id);
        // Para cancelar el viaje se comprueba que no se haya iniciado ya el viaje o no se haya cnacelado previamente
        if (empty($trip->drive_start && empty($trip->cancelled_at))) {
            $trip = Trip::find($id);
            $trip->cancelled_at = now();
            $trip->save();

            return response()->json(["success" => true, "data" => $trip], 200);
        }

        return response()->json(["success" => false, "data" => "No se ha podido cancelar el viaje"], 400);

    }


    // Método de cancelación del viaje como pasajero
    public function cancelPassengerTrip($id)
    {

        $user = Auth::user();
        $reserve = $user->reserves()->where("trip_id", $id)->first();

        // Con los datos de la reserva, se comprueba que no se haya checkin antes o se haya cancelado por parte del pasajero
        // de forma previa
        if (empty($reserve->pivot->check_in) && empty($reserve->pivot->cancelled_at)) {
            $user->reserves()->updateExistingPivot($id, [
                'cancelled_at' => now(),
            ]);
            $reserve = $user->reserves()->where("trip_id", $id)->first();

            return response()->json(["success" => true, "data" => $reserve], 200);
        }


        return response()->json(["success" => false, "data" => "Has hecho check-in o ya has cancelado el viaje"], 409);



    }

    // Método que consigue el historial de viajes del conductor
    public function indexHistoryAsDriver()
    {
        $user = Auth::user();

        // Con una join con las tablas de usuarios, vehículo y tabla itmerdia de reservas, se consiguen los viajes
        // que ya hayan finalizado o que no estén cancelados
        $trips = Trip::with([
            'vehicle:id,brand,model',
            'user:id,alias'
        ])->with("reserves")
            ->where('user_id', $user->id)
            ->where(function ($query) {
                $query->whereNotNull("drive_end")
                    ->orWhereNotNull("cancelled_at");

            })
            ->get();

        return response()->json(["success" => true, "data" => $trips], 200);
    }


    // Método para conseguir todos los viajes históricos del pasajero
    public function indexHistoryAsPassenger()
    {
        $user = Auth::user();

        // Se requiere los datos de las valoraciones de la tabla rates, usuarios, imágenes y vehioculos para ofrecer al usuario
        // todos los detalles posibles de la reserva.
        $trips = $user->reserves()
            ->with([
                "rates" => function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                        ->select('id', 'user_id', 'trip_id', 'rate');
                },
                "vehicle:id,plate,brand,model",
                "user:id,alias",
                "user.media"
            ])
            // Se consigue los históricos con aquellos enlos que hay checkin del usuario, el viaje ha finalizado,
            // la hora de salida es inferior a la actual, el viaje no ha sido cancelado ni por conductor ni por
            // pasajero
            ->where(function ($query) {
                $query
                    ->WhereNotNull("user_trips_reserves.check_in")
                    ->WhereNotNull("trips.drive_end")
                    ->Where(function ($q) {
                        $q
                            ->where(DB::raw("trips.departure_time"), '<', now());
                    })
                    ->orWhereNotNull("trips.cancelled_at")
                    ->orWhereNotNull("user_trips_reserves.cancelled_at");
            })
            ->get();

        return response()->json(["success" => true, "data" => $trips], 200);
    }

    public function indexAdmin()
    {
        $now = Carbon::now();
        $weekAgo = $now->copy()->subWeek();

        $stats = [
            'users' => [
                'total' => User::count(),
                'new' => User::whereBetween('created_at', [$weekAgo, $now])->count()
            ],
            'vehicles' => [
                'total' => Vehicle::count(),
                'validated' => Vehicle::where('validation', true)->count()
            ],
            'trips' => [
                'total' => Trip::count(),
                'active' => Trip::where('departure_time', '>=', $now)
                    ->where('arrival_time', '>=', $now)
                    ->count()
            ],
            'reservas' => [
                'total' => Trip::join('user_trips_reserves', 'trips.id', '=', 'user_trips_reserves.trip_id')
                    ->count(),
                'confirmed' => Trip::join('user_trips_reserves', 'trips.id', '=', 'user_trips_reserves.trip_id')
                    ->whereBetween('user_trips_reserves.created_at', [$weekAgo, $now])
                    ->whereNotNull('user_trips_reserves.check_in')
                    ->count()
            ]
        ];

        return response()->json(["success" => true, "data" => $stats], 200);
    }



}
