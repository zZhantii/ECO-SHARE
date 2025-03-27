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
            'departure_time' => '2030-03-29 18:04:53',
            'arrival_time' => '2030-03-29 18:22:44',
            'available_seats' => 4,
            'unavailable_seats' => 0,
            'price' => 7.0,
        ]);

        $trip2 = Trip::create([
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
            'departure_time' => '2029-03-29 18:04:53',
            'arrival_time' => '2029-03-29 18:22:44',
            'available_seats' => 4,
            'unavailable_seats' => 2,
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
            'departure_time' => '2028-03-29 18:04:53',
            'arrival_time' => '2028-03-29 18:22:44',
            'available_seats' => 4,
            'unavailable_seats' => 0,
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
            'departure_time' => '2027-03-29 18:04:53',
            'arrival_time' => '2027-03-29 18:22:44',
            'available_seats' => 4,
            'unavailable_seats' => 0,
            'price' => 7.0,
        ]);
    }
}
