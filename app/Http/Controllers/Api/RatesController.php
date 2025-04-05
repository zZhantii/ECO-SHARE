<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User_trips_rate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RatesController extends Controller
{
    public function index()
    {
        $rates = User_trips_rate::with(['user', 'trip'])->get();
        return response()->json(["success" => true, "data" => $rates], 200);
    }

    public function store(Request $request, User_trips_rate $rate)
    {
        $rate->user_id = $request->user_id;
        $rate->trip_id = $request->trip_id;
        $rate->rate = $request->rate;
        $rate->save();
        return response()->json(["success" => true, "data" => $rate], 200);
    }

    public function show(User_trips_rate $rate)
    {
        $rateDetails = User_trips_rate::find($rate);
        return response()->json(["success" => true, "data" => $rateDetails], 200);

    }

    public function update(Request $request, User_trips_rate $rate)
    {
        $rate->user_id = $request->user_id;
        $rate->trip_id = $request->trip_id;
        $rate->rate = $request->rate;
        $rate->save();
        return response()->json(["success" => true,"message" => 'Reserva actualizado correctamente'], 200);
    }

    public function destroy($user_id, $trip_id)
    {
        $rate = User_trips_rate::where('user_id', $user_id)
            ->where('trip_id', $trip_id)
            ->firstOrFail();
    
        $rate->delete();
    
        return response()->json(["success" => true, "message" => 'reserva eliminada correctamente'], 200);
    }
}