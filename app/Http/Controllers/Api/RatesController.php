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
        $rates = User::with(['rates' => function($query) {
            $query->withPivot('rate');
        }])->get();

        return response()->json(["success" => true, "data" => $rates], 200);
    }

    public function store(Request $request)
    {
        $user = User::find($request->user_id);

        $user->rates()->attach($request->trip_id, [
            'rate' => $request->rate
        ]);
        
        return response()->json(["success" => true, "message" => "Valoración creada correctamente"], 200);
    }

    public function show($user_id, $trip_id)
    {
        $rate = User::find($user_id)->rates()
                    ->withPivot('rate')
                    ->where('trip_id', $trip_id)
                    ->first();        
        
        return response()->json(["success"  => true, "data" => $rate], 200);

    }

    public function update(Request $request, $user_id, $trip_id)
    {
        // $user = User::find($user_id);

        // $user->rates()->sync([
        //     $trip_id => ['rate' => $request->rate]
        // ]); 

        return $user_id . $trip_id . $request->rate;

        // return response()->json(["success" => true,"message" => 'Valoración actualizado correctamente'], 200);
    }

    public function destroy($user_id, $trip_id)
    {
        $user = User::find($user_id);

        $user->rates()->detach($trip_id);
    
        return response()->json(["success" => true, "message" => 'reserva eliminada correctamente'], 200);
    }
}