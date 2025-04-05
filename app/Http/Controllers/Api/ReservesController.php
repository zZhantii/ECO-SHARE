<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User_trips_reserve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservesController extends Controller
{
    public function index()
    {
        $reserves = User_trips_reserve::with(['user', 'trip'])->get();
        return response()->json(["success" => true, "data" => $reserves], 200);
    }

    public function store(Request $request, User_trips_reserve $reserve)
    {
        $reserve->user_id = $request->user_id;
        $reserve->trip_id = $request->trip_id;
        $reserve->seats_reserved = $request->seats_reserved;
        $reserve->reservation_date = $request->reservation_date;
          $reserve->check_in = $request->check_in;
        $reserve->save();
        return response()->json(["success" => true, "data" => $reserve], 200);
    }

    public function show(User_trips_reserve $reserve)
    {
        $reserveDetails = User_trips_reserve::find($reserve);
        return response()->json(["success" => true, "data" => $reserveDetails], 200);

    }

    public function update(Request $request, User_trips_reserve $reserve)
    {
        $reserve->user_id = $request->user_id;
        $reserve->trip_id = $request->trip_id;
        $reserve->seats_reserved = $request->seats_reserved;
        $reserve->reservation_date = $request->reservation_date;
        $reserve->check_in = $request->check_in;
        $reserve->save();
        return response()->json(["success" => true,"message" => 'Reserva actualizado correctamente'], 200);
    }

    public function destroy($user_id, $trip_id)
    {
        $reserve = User_trips_reserve::where('user_id', $user_id)
            ->where('trip_id', $trip_id)
            ->firstOrFail();
    
        $reserve->delete();
    
        return response()->json(["success" => true, "message" => 'reserva eliminada correctamente'], 200);
    }
}