<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class TripReserveController extends Controller
{
    public function reserveTrip(Request $request)
    {
        // $request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'trip_id' => 'required|exists:trips,id',
        //     'seats_reserved' => 'required|integer|min:1',
        //     'reservation_date' => 'required|date',
        //     'check_in' => 'required|boolean'
        // ]);
        
        $user = auth();
        $user->reserves()->attach($request->trip_id, [
            'seats_reserved' => $request->seats_reserved,
            'reservation_date' => $request->reservation_date,
            'check_in' => $request->check_in
        ]);

        return response()->json(['message' => 'Reserva realizada con éxito'], 200);
    }
}
