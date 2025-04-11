<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservesController extends Controller
{
    public function index()
    {
        $reserves = User::with("reserves")->get();
        return response()->json(["success" => true, "data" => $reserves], 200);
    }

    public function store(Request $request)
    {
        $user = User::find($request->user_id);
        
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Usuario no encontrado"
            ], 404);
        }
    
        $existingReservation = $user->reserves()
            ->where('trip_id', $request->trip_id)
            ->first();
    
        if ($existingReservation) {
            return response()->json([
                "success" => false,
                "message" => "Ya existe una reserva para este usuario y viaje"
            ], 422);
        }
    
        try {
            $user->reserves()->attach($request->trip_id, [
                'seats_reserved' => $request->seats_reserved,
                'reservation_date' => $request->reservation_date,
                'check_in' => $request->check_in,
                'total_price' => $request->total_price
            ]);
    
            return response()->json([
                "success" => true,
                "message" => "Reserva creada correctamente"
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al crear la reserva",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function show($user_id, $trip_id)
    {
        try {
            $reserve = User::find($user_id)->reserves()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$reserve) {
                return response()->json([
                    "success" => false,
                    "message" => "Reserva no encontrada"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "data" => $reserve
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener la reserva",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $user_id, $trip_id)
    {
        try {
            $user = User::findOrFail($user_id);
            
            $existingReservation = $user->reserves()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$existingReservation) {
                return response()->json([
                    "success" => false,
                    "message" => "Reserva no encontrada"
                ], 404);
            }

            $user->reserves()->sync([
                $trip_id => [
                    'seats_reserved' => $request->seats_reserved,
                    'reservation_date' => $request->reservation_date,
                    'check_in' => $request->check_in,
                    'total_price' => $request->total_price
                ]
            ]);

            return response()->json([
                "success" => true,
                "message" => 'Reserva actualizada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al actualizar la reserva",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($user_id, $trip_id)
    {
        try {
            $user = User::findOrFail($user_id);
            
            $existingReservation = $user->reserves()
                ->where('trip_id', $trip_id)
                ->first();

            if (!$existingReservation) {
                return response()->json([
                    "success" => false,
                    "message" => "Reserva no encontrada"
                ], 404);
            }

            $user->reserves()->detach($trip_id);

            return response()->json([
                "success" => true,
                "message" => 'Reserva eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al eliminar la reserva",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}