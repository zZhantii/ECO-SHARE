<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use Validator;


class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::All();
        return response()->json(["success" => true, "data" => $trips], 200);
    }
}
