<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Trip;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;

class ReserveTest extends TestCase
{
    use RefreshDatabase;

    public function test_reserve_create(): void
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
            'vehicle_id' => 1,
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

        $user->reserves()->attach($trip->id, [
            'seats_reserved' => 2,
            'reservation_date' => now(),
            'total_price' => 31.00,
            'check_in' => null
        ]);

        $this->assertDatabaseHas('user_trips_reserves', [
            'user_id' => $user->id,
            'trip_id' => $trip->id,
            'seats_reserved' => 2,
            'total_price' => 31.00
        ]);

        $reserve = $user->reserves()->first();
        $this->assertEquals(2, $reserve->pivot->seats_reserved);
        $this->assertEquals(31.00, $reserve->pivot->total_price);
        $this->assertNull($reserve->pivot->check_in);
    }
}
