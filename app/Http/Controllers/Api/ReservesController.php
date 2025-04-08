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

        $user->reserves()->attach($request->trip_id, [
            'seats_reserved' => $request->seats_reserved,
            'reservation_date' => $request->reservation_date,
            'check_in' => $request->check_in
        ]);

        return response()->json(["success" => true, "message" => "Reserva creada correctamente"], 200);
    }

    public function show($user_id, $trip_id)
    {
        $reserve = User::find($user_id)->reserves()
                    ->withPivot('seats_reserved', 'reservation_date', 'check_in')
                    ->where('trip_id', $trip_id)
                    ->first();

        return response()->json(["success" => true, "data" => $reserve], 200);
    }

    public function update(Request $request, $user_id, $trip_id)
    {
        $user = User::find($request->user_id);

        $user->reserves()->sync([
            $trip_id => [
                'seats_reserved' => $request->seats_reserved,
                'reservation_date' => $request->reservation_date,
                'check_in' => $request->check_in,
                'total_price' => $request->total_price
            ]
        ]);

        return response()->json(["success" => true, "message" => 'Reserva actualizado correctamente'], 200);
    }

    public function destroy($user_id, $trip_id)
    {
        $user = User::find($user_id);

        $user->reserves()->detach($trip_id);
    
        return response()->json(["success" => true, "message" => 'reserva eliminada correctamente'], 200);
    }
}