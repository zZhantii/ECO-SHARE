<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    public function index(Request $request)
    {
        $query = Trip::query();

        if ($request->has("start_point")) {
            $query->where("start_point", "like", "%".$request->start_point . "%");
        }

        if ($request->filled('end_point')) {
            $query->where('end_point', 'like', '%' . $request->end_point . '%');
        }

        if ($request->has("date")) {
            $query->whereDate("departure_time", $request->date);
        }

        if ($request->has('passengers')) {
            $query->where('available_seats', '>=', $request->passengers);
        }

        $trips = $query->get();

        return response()->json([
            'data' => $trips
        ]);
    }

    public function show(Trip $trip)
    {
         $tripDetails = Vehicle::find($trip->id);

        if (!$tripDetails) {
            return response()->json(['message' => 'Trip no encontrado'], 404);
        }

        return response()->json($tripDetails);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ["required", "integer"],
            'start_point' => ["required", "string", "max:255"],
            "end_point" => ["required", "string", "max:255"],
            'vehicle_id' => ["required", "integer"],
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
