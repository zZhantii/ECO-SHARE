<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Author;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::All();
        return response()->json(["success" => true, "data" => $authors], 200);
    }


    public function show(Author $author)
    {
        $authors = Author::find($author);
        return response()->json(["success" => true, "data" => $author], 200);
    }
    public function store(Request $request)
    {
        // Primer método con validación
        $validator = Validator::make($request->all(), [
            'name' => ["required", "max:255"],
            "surname" => ["required", "max:255"],
            "email" => ["required", "unique:authors"]
        ]);

        $data = $validator->validated();
        $author = Author::create($data);

        return response()->json(["success" => true, "data" => $author], 200);
        // Segundo metodo
        // $author = new Author();
        // $author->name = $request->name;
        // $author->surname = $request->surname;
        // $author->email = $request->email;
        // $author->save();

        // return $request->all();
    }

    public function destroy(Author $author)
    {
        $author->delete();
        return response()->json([
            'success' => true,
            'message' => 'Author deleted successfully'
        ], 200);
    }

    public function update(Request $request, Author $author)
    {

        $author->name = $request->name;
        $author->surname = $request->surname;
        $author->email = $request->email;

        $author->save();
        return response()->json([
            'success' => true,
            'data' => $author
        ], 200);
    }
}
