<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Validator;


class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::All();
        return response()->json(["success" => true, "data" => $vehicles], 200);
    }

    public function show($id)
    {
        $vehicleDetails = Vehicle::find($id);

        if (!$vehicleDetails) {
            return response()->json(['message' => 'Vehículo no encontrado'], 404);
        }

        return response()->json($vehicleDetails);
    }
}
