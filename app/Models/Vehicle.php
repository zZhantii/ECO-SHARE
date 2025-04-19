<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plate',
        'brand',
        'model',
        'consumption',
        'pax_number',
        'validation',
        'fuel_type',
    ];

    // foreign key

    // Relacion usuarios-trips 1:N (N trips)
    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }


    // Relacion vehicles-trips 1:N (1 vehicle)
    public function trips()
    {
        return $this->hasMany(Trip::class, 'vehicle_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rates', 'user_id');
    }
}
