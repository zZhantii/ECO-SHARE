<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Trip;
use App\Model\Tag;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    public function index()
    {
        try {
            $trips = Trip::All();
            return response()->json(["success" => true, "data" => $trips], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener los viajes",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function show(Trip $trip)
    {
        try {
            $tripDetails = Trip::find($trip->id);

            if (!$tripDetails) {
                return response()->json([
                    "success" => false,
                    "message" => "Viaje no encontrada"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "data" => $tripDetails
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener el viaje",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function showTag($trip_id)
    {
        try {
            $trip = Trip::with('tags')->findOrFail($trip_id);

            $tagIds = $trip->tags->pluck('id');

            if (!$trip) {
                return response()->json([
                    "success" => false,
                    "message" => "Viaje no encontrado"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "data" => $tagIds
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener las etiquetas",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ["required", "integer"],
            'start_point' => ["required"],
            "end_point" => ["required"],
            'vehicle_id' => ["required", "integer"],
            'departure_time' => ["required"],
            'arrival_time' => ["required"],
            'price' => ["required", "numeric", "min:7"],
            'available_seats' => ["required", "integer"],
            'tags' => ["array"],
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "errors" => $validator->errors()], 400);
        }

        $data = $validator->validated();
        $trip = Trip::create($data);
        $trip->tags()->sync($data['tags']);

        // try {
        //     $existingTrip = $trip->where('user_id', $request->user_id)
        //         ->where('vehicle_id', $request->vehicle_id)
        //         ->where('departure_time', $request->departure_time)
        //         ->where('arrival_time', $request->arrival_time)
        //         ->first();

        //     if ($existingTrip) {
        //         return response()->json([
        //             "success" => false,
        //             "message" => "El viaje ya existe"
        //         ], 400);
        //     }    
        // } catch (\Exception $e) {
        //     return response()->json([
        //         "success" => false,
        //         "message" => "Error al crear el viaje",
        //         "error" => $e->getMessage()
        //     ], 500);
        // }

        return response()->json(["success" => true, "data" => $trip], 200);
    }

    public function update(Request $request, Trip $trip)
    {
        try {
            $trip->user_id = $request->user_id;
            $trip->vehicle_id = $request->vehicle_id;
            $trip->start_point = is_string($request->start_point) ? json_decode($request->start_point, true) : $request->start_point;
            $trip->end_point = is_string($request->end_point) ? json_decode($request->end_point, true) : $request->end_point;
            $trip->departure_time = $request->departure_time;
            $trip->arrival_time = $request->arrival_time;
            $trip->available_seats = $request->available_seats;
            $trip->price = $request->price;

            $trip->save();

            return response()->json([
                "success" => true,
                "message" => "Viaje actualizado correctamente",
                "data" => $trip
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al actualizar el viaje",
                "error" => $e->getMessage()
            ], 500);
        }

    }

    public function destroy(Trip $trip)
    {
        try {
            $trip->delete();
            return response()->json(['success' => true, "data" => "Trip deleted successfully"], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al eliminar el viaje",
                "error" => $e->getMessage()
            ], 500);
        }
    }

        public function searchTrip(Request $request)
        {
            $startPoint = $request->input('start_point');
            $localityStart = $request->input('locality_start');
            $endPoint = $request->input('end_point');
            $localityEnd = $request->input('locality_end');
            $departureTime = $request->input('departure_time');
            $requestedSeats = $request->input('available_seats', 1);
            $user_id = auth()->user()->id;

            $trips = Trip::with(['reserves' => function ($query) {
                $query->select('trip_id', 'seats_reserved');
            }])
            ->where('available_seats', '>=', $requestedSeats)
            ->whereDoesntHave('reserves', function($query) use ($user_id) {
                $query->where('user_id', $user_id)
                    ->whereNull('cancelled_at');
            })
            ->when($departureTime, function ($query) use ($departureTime) {
                $query->where('departure_time', '>=', $departureTime);
            })
            ->where('available_seats', '>=', $requestedSeats)
            ->when($departureTime, function ($query) use ($departureTime) {
                $query->where('departure_time', '>=', $departureTime);
            })
            ->when($startPoint, function ($query) use ($startPoint) {
                $query->whereJsonContains('start_point->address', $startPoint);
            })
            ->when($localityStart, function ($query) use ($localityStart) {
                $query->whereJsonContains('start_point->locality', $localityStart);
            })
            ->when($endPoint, function ($query) use ($endPoint) {
                $query->whereJsonContains('end_point->address', $endPoint);
            })
            ->when($localityEnd, function ($query) use ($localityEnd) {
                $query->whereJsonContains('end_point->locality', $localityEnd);
            })
            ->get()
            ->map(function ($trip) {
                $startPoint = is_string($trip->start_point) ? json_decode($trip->start_point) : (object)$trip->start_point;
                $endPoint = is_string($trip->end_point) ? json_decode($trip->end_point) : (object)$trip->end_point;
                
                $reservedSeats = $trip->reserves->sum('seats_reserved') ?? 0;
                $remainingSeats = $trip->available_seats - $reservedSeats;

                return [
                    'id' => $trip->id,
                    'user_id' => $trip->user_id,
                    'vehicle_id' => $trip->vehicle_id,
                    'start_address' => $startPoint->address ?? null,
                    'start_locality' => $startPoint->locality ?? null,
                    'end_address' => $endPoint->address ?? null,
                    'end_locality' => $endPoint->locality ?? null,
                    'departure_time' => $trip->departure_time,
                    'arrival_time' => $trip->arrival_time,
                    'available_seats' => $trip->available_seats,
                    'remaining_seats' => $remainingSeats,
                    'price' => $trip->price,
                    'created_at' => $trip->created_at,
                    'updated_at' => $trip->updated_at
                ];
            })
            ->filter(function ($trip) use ($requestedSeats) {
                return $trip['remaining_seats'] >= $requestedSeats;
            })
            ->values();
    
        return response()->json([
            "success" => true,
            "data" => $trips,
            "requested_seats" => $requestedSeats
        ], 200);
    }

   private function formatDateTime($dateTime)
{
    try {
        return Carbon::parse($dateTime)->format('Y-m-d H:i:s');
    } catch (\Exception $e) {
        return Carbon::now()->format('Y-m-d H:i:s');
    }
}

public function reserve(Trip $trip, Request $request)
{
    try {
        $user_id = auth()->user()->id;
        $reserved_seats = $request->seats_reserved;
    
        if ($trip->user_id === $user_id) {
            return response()->json([
                "success" => false,
                "message" => "No puedes reservar tu propio viaje"
            ], 422);
        }

        $reservation_date = $this->formatDateTime($request->reservation_date);

        $trip->reserves()->attach($user_id, [
                'seats_reserved' => $request->seats_reserved,
                'reservation_date' => $reservation_date,
                'check_in' => $request->check_in
            ]);

        $trip->load('reserves');

        return response()->json([
            "success" => true,
            "message" => "Reserva creada correctamente",
            "data" => $trip
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Error al crear la reserva",
            "error" => $e->getMessage()
        ], 500);
    }
}
}
