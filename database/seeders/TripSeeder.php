<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trip;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trip1 = Trip::create([
            'user_id' => 1,
            'vehicle_id' => 1,
            'start_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'end_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'departure_time' => '2025-04-22 18:04:53',
            'arrival_time' => '2025-04-22 18:22:44',
            'available_seats' => 1,
            'price' => 7.0,
        ]);

        $trip2 = Trip::create([
            'user_id' => 1,
            'vehicle_id' => 2,
            'start_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'end_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'departure_time' => '2025-04-13 18:14:53',
            'arrival_time' => '2025-04-13 18:32:44',
            'available_seats' => 3,
            'price' => 7.0,
        ]);

        $trip3 = Trip::create([
            'user_id' => 1,
            'vehicle_id' => 1,
            'start_point' => [
                "address" => "Molins de Rei",
                "locality" => "Molins de Rei",
                "location" => [
                    "latitude" => 41.4134488,
                    "longitude" => 2.0182425
                ]
            ],
            'end_point' => [
                "address" => "Martorell",
                "locality" => "Martorell",
                "location" => [
                    "latitude" => 41.4777114,
                    "longitude" => 1.9177343
                ]
            ],
            'departure_time' => '2024-04-09 18:20:53',
            'arrival_time' => '2024-04-09 18:42:44',
            'available_seats' => 4,
            'price' => 7.0,
        ]);
    }
}
