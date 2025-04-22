<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleTableSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'id' => 1,
                'user_id' => 1,
                'brand' => 'FORD',
                'model' => 'MUSTANG',
                'plate' => '5678XYZ',
                'pax_number' => 4,
                'consumption' => 10.0,
                'fuel_type' => "Gasolina",
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'brand' => 'SEAT',
                'model' => 'LEÓN',
                'plate' => '1234BCD',
                'pax_number' => 5,
                'consumption' => 6.2,
                'fuel_type' => "Gasolina",
            ],
            [
                'id' => 3,
                'user_id' => 2,
                'brand' => 'MERCEDES',
                'model' => 'CLASE A',
                'plate' => '9012MNP',
                'pax_number' => 4,
                'consumption' => 8.2,
                'fuel_type' => "Diésel",
            ],
            [
                'id' => 4,
                'user_id' => 2,
                'brand' => 'BMW',
                'model' => 'X3',
                'plate' => '3456QRS',
                'pax_number' => 5,
                'consumption' => 7.5,
                'fuel_type' => "Diésel",
            ],
            [
                'id' => 5,
                'user_id' => 3,
                'brand' => 'RENAULT',
                'model' => 'CLIO',
                'plate' => '7890TUV',
                'pax_number' => 5,
                'consumption' => 5.8,
                'fuel_type' => "Diésel",
            ],
            [
                'id' => 6,
                'user_id' => 4,
                'brand' => 'VOLKSWAGEN',
                'model' => 'GOLF',
                'plate' => '2345WXY',
                'pax_number' => 5,
                'consumption' => 6.8,
                'fuel_type' => "Gasolina",
            ],
            [
                'id' => 7,
                'user_id' => 4,
                'brand' => 'AUDI',
                'model' => 'A3',
                'plate' => '6789ZAB',
                'pax_number' => 5,
                'consumption' => 7.0,
                'fuel_type' => "Gasolina",
            ],
            [
                'id' => 8,
                'user_id' => 5,
                'brand' => 'CITROEN',
                'model' => 'C4',
                'plate' => '4567CDE',
                'pax_number' => 5,
                'consumption' => 6.5,
                'fuel_type' => "Diésel",
            ]
        ];

        foreach ($vehicles as $vehicleData) {
            Vehicle::create($vehicleData);
        }
    }
}