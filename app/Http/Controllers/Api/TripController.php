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
        return response()->json(["success" => true, "data" => $trip], 200);
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
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "errors" => $validator->errors()], 400);
        }

        $data = $validator->validated();
        $trip = Trip::create($data);

        return response()->json(["success" => true, "data" => $trip], 200);
    }
}
