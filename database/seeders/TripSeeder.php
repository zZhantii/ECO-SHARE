<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trip;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $trip1 = Trip::create([
            'user_id' => 2,
            'vehicle_id' => 3,
            'start_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'end_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'departure_time' => '2025-04-23 08:00:00',
            'arrival_time' => '2025-04-23 08:25:00',
            'available_seats' => 2,
            'price' => 5.0,
        ]);

        $trip2 = Trip::create([
            'user_id' => 3,
            'vehicle_id' => 5,
            'start_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'end_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'departure_time' => '2025-04-23 08:15:00',
            'arrival_time' => '2025-04-23 08:40:00',
            'available_seats' => 4,
            'price' => 7.0,
        ]);

        $trip3 = Trip::create([
            'user_id' => 4,
            'vehicle_id' => 6,
            'start_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'end_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'departure_time' => '2025-04-23 17:00:00',
            'arrival_time' => '2025-04-23 17:25:00',
            'available_seats' => 3,
            'price' => 3.0,
        ]);

        $trip4 = Trip::create([
            'user_id' => 5,
            'vehicle_id' => 8,
            'start_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'end_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'departure_time' => '2025-04-23 18:00:00',
            'arrival_time' => '2025-04-23 18:25:00',
            'available_seats' => 4,
            'price' => 15.0,
        ]);
    }
}