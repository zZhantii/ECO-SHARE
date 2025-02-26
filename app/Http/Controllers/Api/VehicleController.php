<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::All();
        return response()->json(["success" => true, "data" => $vehicles], 200);
    }

    public function show(Vehicle $vehicle)
    {
        $vehicleDetails = Vehicle::find($vehicle->id);

        if (!$vehicleDetails) {
            return response()->json(['message' => 'Vehículo no encontrado'], 404);
        }

        return response()->json($vehicleDetails);

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

    public function destroy(Vehicle $vehicle)
    {

        $vehicle->delete();
        return response()->json(['success' => true, "data" => "Vehicle deleted successfully"], 200);
    }

    public function store(Request $request)
    {


        $vehicle = new Vehicle();
        $vehicle->plate = $request->plate;
        $vehicle->brand = $request->brand;
        $vehicle->fuel_type = $request->fuel_type;
        $vehicle->model = $request->model;
        $vehicle->consumption = $request->consumption;
        $vehicle->pax_number = $request->pax_number;
        $vehicle->user_id = Auth::id();

        $vehicle->save();

        return response()->json(["success" => true, "data" => $vehicle], 200);

    }
}