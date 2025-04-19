<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Trip;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;

class TripTest extends TestCase
{
    use RefreshDatabase;

    public function test_trip_create(): void
    {
        $user = User::create([
            'name' => 'prueba',
            'surname1' => 'prueba2',
            'surname2' => 'prueba3',
            'alias' => 'prueba4',
            'email' => 'prueba@example.com',
            'password' => bcrypt('password123'),
        ]);

        $vehicle = Vehicle::create([
            'user_id' => $user->id,
            'plate' => 'ABC1234',
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'consumption' => 5.0,
            'pax_number' => 5,
            'validation' => 0,
            'fuel_type' => 'Gasoline',
        ]);

        $trip = Trip::create([ 
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'start_point' => json_encode([
                'address' => 'Calle Falsa 123',
                'lat' => 41.12345,
                'lng' => 2.12345
            ]),
            'end_point' => json_encode([
                'address' => 'Avenida Siempre Viva',
                'lat' => 41.54321,
                'lng' => 2.54321
            ]),
            'departure_time' => Carbon::now()->addDays(1)->setTime(8, 30),
            'arrival_time' => Carbon::now()->addDays(1)->setTime(12, 0),
            'available_seats' => 3,
            'price' => 15.50,
            'drive_start' => null,
            'drive_end' => null
        ]);

         $this->assertDatabaseHas('trips', [
            'id'             => $trip->id,
            'user_id'        => $user->id,
            'vehicle_id'     => $vehicle->id,
            'start_point' => json_encode([
                'address' => 'Calle Falsa 123',
                'lat' => 41.12345,
                'lng' => 2.12345
            ]),
            'end_point' => json_encode([
                'address' => 'Avenida Siempre Viva',
                'lat' => 41.54321,
                'lng' => 2.54321
            ]),
            'departure_time' => Carbon::now()->addDays(1)->setTime(8, 30),
            'arrival_time' => Carbon::now()->addDays(1)->setTime(12, 0),
            'available_seats'=> 3,
            'price'          => 15.50,
            'drive_start'    => null,
            'drive_end'      => null,
        ]);

    }
}
