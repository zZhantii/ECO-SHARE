<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class AppController extends Controller
{

    public function indexVehicle()
    {
        $user = Auth::user();
        $vehicle = Vehicle::where("user_id", $user->id)->get();
        return response()->json(["success" => true, "data" => $vehicle], 200);

    }



}
