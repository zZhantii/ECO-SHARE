<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'start_point',
        'end_point',
        'departure_time',
        'available_seats',
        'price',
    ];

    // Relacion 1:N (N trips)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relacion vehicles-trips 1:N (N trip)
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    // Relacion trips-tags N:M (N Trips)
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'trip_taps', 'tag_id');
    }

    // Relacion user_trips_rates N:M (M Trips)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rates', 'user_id');
    }
}
