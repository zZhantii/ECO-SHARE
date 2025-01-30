<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip_tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'tag_id',
    ];

    public $incrementing = false;
    protected $primaryKey = ['trip_id', 'tag_id'];
    protected $keyType = 'array';
}
