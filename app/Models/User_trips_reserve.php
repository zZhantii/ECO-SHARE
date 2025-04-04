<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_trips_reserve extends Model
{
    use HasFactory;

    protected $table = 'user_trips_reserves';

    protected $fillable = [
        'user_id',
        'trip_id',
        'seats_reserved',
        'reservation_date',
        'check_in',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }
}