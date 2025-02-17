<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::all();

        return response()->json(['success' => true, 'data' => $vehicles], 200);
    }

    public function update(Request $request, Vehicle $vehicle)
    {

        $vehicle->brand = $request->brand;
        $vehicle->fuel_type = $request->fuel_type;
        $vehicle->model = $request->model;
        $vehicle->pax_number = $request->pax_number;

        $vehicle->save();

        return response()->json(['success' => true, "data" => $vehicle], 200);

    }
}
