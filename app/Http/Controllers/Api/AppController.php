<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;


class AppController extends Controller
{

    public function showVehicle(User $user)
    {

        $vehicle = Vehicle::where("user_id", $user->id)->first();
        return response()->json(["success" => true, "message" => $vehicle], 200);

    }

}
