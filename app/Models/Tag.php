<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag_name'
    ];

    // Relacion trips-tags N:M (M Tags)
    public function trip()
    {
        return $this->belongsToMany(Trip::class, 'tags_trips', 'tag_id', 'trip_id');
    }
}
