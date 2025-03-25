<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
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

        return response()->json($tripDetails);
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

    public function updateSeats(Request $request, Trip $trip)
    {
        $trip->available_seats = $request->available_seats;
        
        $trip->save();

        return response()->json(["success" => true, "data" => $trip], 200);
    }
}
