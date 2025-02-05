<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag_id',
        'tag_name'
    ];

    // Relacion trips-tags N:M (M Tags)
    public function trip()
    {
        return $this->belongsToMany(Trip::class, 'trip_taps', 'trip_id');
    }
}
