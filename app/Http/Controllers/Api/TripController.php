<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Trip;
use App\Models\User_trips_reserve;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::All();
        return response()->json(["success" => true, "data" => $trips], 200);
    }

    public function show(Trip $trip)
    {
        $tripDetails = Trip::find($trip->id);

        if (!$tripDetails) {
            return response()->json(['message' => 'Trip no encontrado'], 404);
        }

        return response()->json(["success" => true, "data" => $tripDetails], 200);
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
            'price' => ["required", "numeric"],
            'available_seats' => ["required", "integer"],
            'tags' => ["array"],
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "errors" => $validator->errors()], 400);
        }

        $data = $validator->validated();
        $trip = Trip::create($data);
        $trip->tags()->sync($data['tags']);

        return response()->json(["success" => true, "data" => $trip], 200);
    }

    public function update(Request $request, Trip $trip)
    {
        $trip->user_id = $request->user_id;
        $trip->vehicle_id = $request->vehicle_id;
        $trip->start_point = is_string($request->start_point) ? json_decode($request->start_point, true) : $request->start_point;
        $trip->end_point = is_string($request->end_point) ? json_decode($request->end_point, true) : $request->end_point;
        $trip->departure_time = $request->departure_time;
        $trip->arrival_time = $request->arrival_time;
        $trip->available_seats = $request->available_seats;
        $trip->price = $request->price;

        $trip->save();

        return response()->json(['success' => true, "data" => $trip], 200);
    }

    
    public function destroy(Trip $trip)
    {

        $trip->delete();
        return response()->json(['success' => true, "data" => "Trip deleted successfully"], 200);
    }

    public function searchTrip(Request $request)
    {
        $startPoint = $request->input('start_point');
        $localityStart = $request->input('locality_start');
        $endPoint = $request->input('end_point');
        $localityEnd = $request->input('locality_end');
        $departureTime = $request->input('departure_time');
        $requestedSeats = $request->input('available_seats', 1); 

        $query = Trip::select([
                'trips.id',
                'trips.user_id',
                'trips.vehicle_id',
                DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.start_point, "$.address")) as start_address'),
                DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.start_point, "$.locality")) as start_locality'),
                DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.end_point, "$.address")) as end_address'),
                DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.end_point, "$.locality")) as end_locality'),
                'trips.departure_time',
                'trips.arrival_time',
                'trips.available_seats',
                'trips.price',
                'trips.created_at',
                'trips.updated_at',
                DB::raw('(trips.available_seats - IFNULL((
                    SELECT SUM(utr.seats_reserved) 
                    FROM user_trips_reserves utr 
                    WHERE utr.trip_id = trips.id
                ), 0)) as remaining_seats')
            ])
            ->having('remaining_seats', '>=', $requestedSeats)
            ->where('trips.available_seats', '>=', $requestedSeats); 


        if ($startPoint) {
            $query->where(DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.start_point, "$.address"))'), 'like', "%$startPoint%");
        }

        if ($localityStart) {
            $query->where(DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.start_point, "$.locality"))'), 'like', "%$localityStart%");
        }

        if ($endPoint) {
            $query->where(DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.end_point, "$.address"))'), 'like', "%$endPoint%");
        }

        if ($localityEnd) {
            $query->where(DB::raw('JSON_UNQUOTE(JSON_EXTRACT(trips.end_point, "$.locality"))'), 'like', "%$localityEnd%");
        }

        if ($departureTime) {
            $query->where('departure_time', '>=', $departureTime);
        }

        $results = $query->get();

        return response()->json([
            "success" => true, 
            "data" => $results,
            "requested_seats" => $requestedSeats
        ], 200);
    }

    // public function updateSeats(Request $request, Trip $trip)
    // {
    //     $trip->unavailable_seats = $request->unavailable_seats;
        
    //     $trip->save();

    //     return response()->json(["success" => true, "data" => $trip], 200);
    // }

    public function reserve(Trip $trip, Request $request)
    {           
        $user_id = auth()->user()->id;

        $seats = $request->available_seats;
        $reserved_seats = $request->seats_reserved;

        if ($seats >= $reserved_seats) {
              $trip->reserves()->attach($user_id, [
                'seats_reserved' => $request->seats_reserved,
                'reservation_date' => $request->reservation_date,
                'check_in' => $request->check_in
            ]);
            return response()->json(["success" => true, "data" => $trip], 200);
        }

        return response()->json(["success" => false, 'message' => 'Error al reservar'], 400);
    }

    public function getAllReservations()
    {
        $reservations = User_trips_reserve::with(['user', 'trip']);

        return response()->json(["success" => true, 'data' => $reservations], 200);
    }
}
