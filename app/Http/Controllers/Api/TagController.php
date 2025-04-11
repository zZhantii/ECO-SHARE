<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::All();
            return response()->json(["success" => true, "data" => $tags], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener las etiquetas",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function show(Tag $tag) {
        try {
            $tagDetails = Tag::find($tag);
            
            if (!$tagDetails) {
                return response()->json([
                    "success" => false,
                    "message" => "Etiqueta no encontrada"
                ], 404);
            }

            return response()->json([
                "success" => true, 
                "data" => $tagDetails
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al obtener la etiqueta",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Tag $tag) {
         try {
            $tag->tag_name = $request->tag_name;
            $tag->save();

            return response()->json([
                "success" => true,  
                "message" => "Etiqueta actualizada correctamente",
                "data" => $tag
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al actualizar la etiqueta",
                "error" => $e->getMessage()
            ], 500);
        }

        return response()->json(["succes" => true, "message" => 'Etiqueta actualizado correctamente'], 200);
    }

    public function store(Request $request) {
        try {
            $tag = new Tag();

            $existingTag = $tag->where('tag_name', $request->tag_name)->first();

             if ($existingTag) {
                return response()->json([
                    "success" => false,
                    "message" => "Ya existe esta etiqueta"
                ], 422);
            }

            $tag->tag_name = $request->tag_name;
            $tag->save();

            return response()->json([
                "success" => true,
                "message" => "Etiqueta creada correctamente",
                "data" => $tag
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al crear la etiqueta",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Tag $tag) {
        try {
            $tag->delete();
            return response()->json(['success' => true, "message" => "Etiqueta eliminado correctamente"], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al eliminar la etiqueta",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
