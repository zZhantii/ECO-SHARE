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

    //Método para iniciar el viaje por parte del conductor
    public function startDrive($id)
    {
        $trip = Trip::find($id);

        if (empty($trip->drive_start) && empty($trip->drive_end)) {
            $trip->drive_start = now();
            $trip->save();
            return response()->json(["success" => true, "data" => $trip], 200);
        }

        return response()->json(["success" => false, "data" => $trip], 400);

    }

    //Método para finalizar el viaje
    public function endDrive($id)
    {
        $trip = Trip::find($id);

        if (empty($trip->drive_start)) {

            return response()->json(["success" => false, "data" => "El viaje no ha sido iniciado"], 400);
        } else {
            if (!empty($trip->drive_end)) {
                return response()->json(["success" => false, "data" => $trip], 400);

            } else {
                $trip->drive_end = now();
                $trip->save();
                return response()->json(["success" => true, "data" => $trip], 200);
            }
        }



    }

    //Método que recoge los viajes activos como conductor
    public function indexDriverTrips(Request $request)
    {

        $user = Auth::user();


        $trips = Trip::where("user_id", $user->id)->where("departure_time", ">=", now())->with("vehicle")->get();

        return response()->json(["suceess" => True, "data" => $trips], 200);
    }

    //Método que recoge los viajes activos como pasajero
    public function indexPassengerTrips(Request $request)
    {

        $user = Auth::user();


        $trips = Trip::where("user_id", $user->id)->where("departure_time", ">=", now())->with("vehicle")->get();

        return response()->json(["suceess" => True, "data" => $trips], 200);
    }


}
