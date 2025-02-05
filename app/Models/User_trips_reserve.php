<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_trips_reserve extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'trip_id',
        'seats_reserved',
        'reservation_date',
        'check_in',
    ];
}
