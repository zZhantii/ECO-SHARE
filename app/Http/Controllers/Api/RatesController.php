<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RatesController extends Controller
{
    public function index()
    {
        $rates = User::with("rates")->get();
        return response()->json(["success" => true, "data" => $rates], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'trip_id' => 'required|exists:trips,id',
            'rate' => 'required|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Datos de valoración inválidos",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $user = User::find($request->user_id);
            
            if (!$user) {
                return response()->json([
                    "success" => false,
                    "message" => "Usuario no encontrado"
                ], 404);
            }

            $existingRate = $user->rates()
                ->where('trip_id', $request->trip_id)
                ->first();

            if ($existingRate) {
                return response()->json([
                    "success" => false,
                    "message" => "Ya existe una valoración para este usuario y viaje"
                ], 422);
            }

            $user->rates()->attach($request->trip_id, [
                'rate' => $request->rate
            ]);
            
            return response()->json([
                "success" => true,
                "message" => "Valoración creada correctamente"
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al crear la valoración",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function show($user_id, $trip_id)
    {
        $validator = Validator::make([
            'user_id' => $user_id,
            'trip_id' => $trip_id
        ], [
            'user_id' => 'required|exists:users,id',
            'trip_id' => 'required|exists:trips,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Parámetros inválidos",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $rate = User::find($user_id)->rates()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$rate) {
                return response()->json([
                    "success" => false,
                    "message" => "Valoración no encontrada"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "data" => $rate
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener la valoración",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $user_id, $trip_id)
    {
        $validator = Validator::make($request->all(), [
            'rate' => 'required|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Datos de valoración inválidos",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $user = User::findOrFail($user_id);
            
            $existingRate = $user->rates()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$existingRate) {
                return response()->json([
                    "success" => false,
                    "message" => "Valoración no encontrada"
                ], 404);
            }

            $user->rates()->sync([
                $trip_id => ['rate' => $request->rate]
            ]);

            return response()->json([
                "success" => true,
                "message" => "Valoración actualizada correctamente"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al actualizar la valoración",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($user_id, $trip_id)
    {
        $validator = Validator::make([
            'user_id' => $user_id,
            'trip_id' => $trip_id
        ], [
            'user_id' => 'required|exists:users,id',
            'trip_id' => 'required|exists:trips,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Parámetros inválidos",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $user = User::findOrFail($user_id);
            
            $existingRate = $user->rates()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$existingRate) {
                return response()->json([
                    "success" => false,
                    "message" => "Valoración no encontrada"
                ], 404);
            }

            $user->rates()->detach($trip_id);

            return response()->json([
                "success" => true,
                "message" => "Valoración eliminada correctamente"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al eliminar la valoración",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}