<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Author;

use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all();
        return response()->json(['status' => 485, 'success' => true, 'data' => $authors]);
    }

    public function store(Request $request)
    {
        // Primer metodo
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'max:255'],
            'surname' => ['required', 'max:255'],
            'email' => ['required', 'unique:Author']
        ]);

        $data = $validator->validated();

        $author = Author::create($data);

        return response()->json(['status' => 485, 'success' => true, 'data' => $author]);


        // Segundo metodo
        // $author = new Author();
        // $author->name = $request->name;
        // $author->surname = $request->surname;
        // $author->email = $request->email;
        // $author->save();

        return $request->all();
    }
}
