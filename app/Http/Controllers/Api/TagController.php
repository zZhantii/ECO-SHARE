<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::All();
        return response()->json(["success" => true, "data" => $tags], 200);
    }

    public function show(Tag $tag) {

        $tag = Tag::find($tag);
        return response()->json(["succes" => true, "data" => $tag], 200);
    }

    public function update(Request $request, Tag $tag) {
        $tag->tag_name = $request->tag_name;

        $tag->save();

        return response()->json(["succes" => true, "message" => 'Etiqueta actualizado correctamente'], 200);
    }

    public function store(Request $request) {
        $tag = new Tag();
        $tag->tag_name = $request->tag_name;

        $tag->save();

        return response()->json(["success" => true, "data" => $tag], 200);
    }

    public function destroy(Tag $tag) {
        $tag->delete();
        return response()->json(['success' => true, "message" => "Etiqueta eliminado correctamente"], 200);
    }
}
