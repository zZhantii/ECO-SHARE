<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicle1 = Vehicle::create([
            'id' => 1,
            'user_id' => 1,
            'brand' => 'FORD',
            'model' => 'MUSTANG',
            'plate' => '5678-XYZ',
            'pax_number' => 4,
            'consumption' => 10.0,
            'fuel_type' => "GASOLINE",
        ]);

        $vehicle2 = Vehicle::create([
            'id' => 2,
            'user_id' => 1,
            'brand' => 'SEAT',
            'model' => 'PANDA',
            'plate' => '1234-BCD',
            'pax_number' => 4,
            'consumption' => 6.2,
            'fuel_type' => "GASOLINE",
        ]);
        $vehicle2 = Vehicle::create([
            'id' => 3,
            'user_id' => 1,
            'brand' => 'MERCEDES',
            'model' => 'CLASE A',
            'plate' => '9012-MNP',
            'pax_number' => 4,
            'consumption' => 8.2,
            'fuel_type' => "DIESEL",
        ]);
    }
}
