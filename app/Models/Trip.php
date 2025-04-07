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
        'arrival_time',
        'available_seats',
        'price',
        'drive_start',
        'drive_end',
        'cancelled_at'
    ];

    // Relacion 1:N (N trips)
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    // Relacion vehicles-trips 1:N (N trip)
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'id');
    }

    // Relacion trips-tags N:M (N Trips)
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tags_trips', 'trip_id', 'tag_id');
    }

    // Relacion user_trips_rates N:M (M Trips)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rates', 'id');
    }

    public function reserves()
    {

        return $this->belongsToMany(User::class, 'user_trips_reserves', 'trip_id', 'user_id')
            ->withPivot('seats_reserved', 'reservation_date', 'check_in');

    }

    protected $casts = [
        'start_point' => 'array',
        'end_point' => 'array'
    ];
}
