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
            'brand' => 'FORD',
            'model' => 'MOUSTANG',
            'consumption' => 10.0,
            'fuel_type' => "GASOLINE",
        ]);

        $vehicle2 = Vehicle::create([
            'id' => 2,
            'brand' => 'SEAT',
            'model' => 'PANDA',
            'consumption' => 6.2,
            'fuel_type' => "GASOLINE",
        ]);
        $vehicle2 = Vehicle::create([
            'id' => 3,
            'brand' => 'MERCEDES',
            'model' => 'CLASE A',
            'consumption' => 8.2,
            'fuel_type' => "DIESEL",
        ]);
    }
}
