<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;


class AppController extends Controller
{

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


        if (!empty($trip->drive_end)) {
            return response()->json(["success" => false, "data" => "El viaje ya ha terminado"], 400);
        }
        if (!empty($trip->drive_start)) {
            return response()->json(["success" => false, "data" => "El viaje ya ha comenzado"], 400);
        }
        if (!empty($trip->cancelled_at)) {
            return response()->json(["success" => false, "data" => "El viaje ha sido cancelado previamente"], 400);
        }

        $departure = Carbon::parse($trip->departure_time);
        $lastCall = $departure->copy()->addHour();

        if (!now()->between($departure, $lastCall)) {
            return response()->json(["success" => false, "data" => "El viaje debía inicirase entre {$departure} y {$lastCall}."], 400);
        }
        $price = $trip->price;
        $totalSeatsReserved = $trip->reserves()->whereNotNull("check_in")->sum('seats_reserved');

        if ($totalSeatsReserved == 0) {
            return response()->json(["success" => false, "data" => "No tienes pasajeros confirmados para realizar el viaje."], 400);
        }

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

        if (empty($trip->drive_start && empty($trip->cancelled_at))) {

            return response()->json(["success" => false, "data" => "El viaje no ha sido iniciado"], 400);
        } else {
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
                "data" => "El check-indebia realizarse entre $startCheckIn y $departure."
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


        $trips = Trip::where("user_id", $user->id)
            ->where(DB::raw("departure_time + INTERVAL 1 HOUR"), '>=', now())
            ->whereNull("cancelled_at")
            ->whereNull("drive_end")
            ->with("vehicle")->with("reserves")->get();

        return response()->json(["suceess" => True, "data" => $trips], 200);
    }

    //Método que recoge los viajes activos como pasajero
    public function indexPassengerTrips(Request $request)
    {


        $user = Auth::user();

        $reserves = $user->reserves()
            ->where(function ($query) {
                $query->where("trips.departure_time", '>=', now())
                    ->whereNull("trips.drive_end")
                    ->whereNull("trips.cancelled_at")
                    ->whereNull("user_trips_reserves.cancelled_at")

                    ->orWhere(function ($q) {
                        $q->whereNotNull("user_trips_reserves.check_in")
                            ->whereNotNull("trips.drive_start")
                            ->where('trips.arrival_time', '>', now());

                    });
            })
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
        if (empty($trip->drive_start && empty($trip->cancelled_at))) {
            $trip = Trip::find($id);
            $trip->cancelled_at = now();
            $trip->save();

            return response()->json(["success" => true, "data" => $trip], 200);
        }

        return response()->json(["success" => false, "data" => "No se ha podido cancelar el viaje"], 400);

    }


    public function cancelPassengerTrip($id)
    {

        $user = Auth::user();
        $reserve = $user->reserves()->where("trip_id", $id)->first();

        if (empty($reserve->pivot->check_in) && empty($reserve->pivot->cancelled_at)) {
            $user->reserves()->updateExistingPivot($id, [
                'cancelled_at' => now(),
            ]);
            $reserve = $user->reserves()->where("trip_id", $id)->first();

            return response()->json(["success" => true, "data" => $reserve], 200);
        }


        return response()->json(["success" => false, "data" => "Has hecho check-in o ya has cancelado el viaje"], 400);



    }

    public function indexHistoryAsDriver()
    {
        $user = Auth::user();

        $trips = Trip::with([
            'vehicle:id,brand,model',
            'user:id,alias'
        ])->with("reserves")
            ->where('user_id', $user->id)
            ->where(function ($query) {
                $query->whereNotNull("drive_end")
                    ->orWhereNotNull("cancelled_at")
                    ->orWhere(function ($q) {
                        $q->where(DB::raw("departure_time + INTERVAL 1 HOUR"), '<', now())
                            ->whereNull('drive_start');

                    });
            })
            ->get();

        return response()->json(["success" => true, "data" => $trips], 200);
    }


    public function indexHistoryAsPassenger()
    {
        $user = Auth::user();

        $trips = $user->reserves()
            ->with([
                "vehicle:id,plate,brand,model",
                "user:id,alias"
            ])
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



}
