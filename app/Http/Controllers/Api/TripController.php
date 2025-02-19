<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use Illuminate\Support\Facades\Validator;


class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::All();
        return response()->json(["success" => true, "data" => $trips], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), []);
    }
}
