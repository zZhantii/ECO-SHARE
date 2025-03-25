<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;


class AppController extends Controller
{

    public function indexVehicle()
    {
        $user = Auth::user();
        $vehicle = Vehicle::where("user_id", $user->id)->get();
        return response()->json(["success" => true, "data" => $vehicle], 200);

    }

    public function indexDriverTrips(Request $request)
    {

        $user = Auth::user();


        $trips = Trip::where("user_id", $user->id)->where("departure_time", ">=", now())->get();

        return response()->json(["suceess" => True, "data" => $trips], 200);
    }


}
