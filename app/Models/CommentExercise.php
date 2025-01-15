<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentExercise extends Model
{
    use HasFactory;

    protected $fillable = ['comment'];
    protected $table = 'exercise_comments';


    public function exercise()
    {
        return $this->belongsTo(Exercise::class,'exercise_id');
    }
}
