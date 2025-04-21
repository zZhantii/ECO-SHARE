<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    // Método para conseguir odos los vehículos registrados en la base de datos
    public function index()
    {
        $vehicles = Vehicle::All();
        return response()->json(["success" => true, "data" => $vehicles], 200);
    }


    // Método que muestra los datos del vehículo que se identifica por el id de la request
    public function show(Vehicle $vehicle)
    {
        try {
            $vehicleDetails = Vehicle::find($vehicle->id);

            if (!$vehicleDetails) {
                return response()->json([
                    "success" => false,
                    "message" => "Vehículo no encontrado"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "data" => $vehicleDetails
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener el vehículo",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    // Método de actualización de los datos del vehículo
    public function update(Request $request, Vehicle $vehicle)
    {
        $vehicle->brand = $request->brand;
        $vehicle->fuel_type = $request->fuel_type;
        $vehicle->model = $request->model;
        $vehicle->pax_number = $request->pax_number;
        $vehicle->validation = $request->validation;
        $vehicle->user_id = $request->user_id;

        $vehicle->save();

        return response()->json(['success' => true, "message" => "Vehiculo actualizado, correctamente"], 200);
    }

    // Método que elimina el vehículo de la base de datos con la referencia del vehículo que procede de la petición API
    public function destroy(Vehicle $vehicle)
    {

        $vehicle->delete();
        return response()->json(['success' => true, "data" => "Vehicle eliminado correctamente"], 200);
    }

    // Método que guarda un solo vehículo con los datos recogidos en la petición API
    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        if ($request->filled('user_id') && $request->user_id > 0) {
            $user_id = $request->user_id;
        }

        $vehicle = new Vehicle();
        $vehicle->plate = $request->plate;
        $vehicle->brand = $request->brand;
        $vehicle->fuel_type = $request->fuel_type;
        $vehicle->model = $request->model;
        $vehicle->consumption = $request->consumption;
        $vehicle->pax_number = $request->pax_number;
        $vehicle->validation = $request->validation;
        $vehicle->user_id = $user_id;

        $vehicle->save();

        return response()->json(["success" => true, "message" => 'Vehiculo creado correctamente'], 200);
    }
}