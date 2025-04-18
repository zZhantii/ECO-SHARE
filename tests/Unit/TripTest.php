<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Trip;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;


class TripTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_trip_create(): void
    {
         $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();

        // Create trip data
        $tripData = [
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'start_point' => json_encode([
                'address' => 'Start Address',
                'lat' => 41.12345,
                'lng' => 2.12345
            ]),
            'end_point' => json_encode([
                'address' => 'End Address',
                'lat' => 41.54321,
                'lng' => 2.54321
            ]),
            'departure_time' => now()->addDay(),
            'arrival_time' => now()->addDay()->addHours(2),
            'available_seats' => 3,
            'price' => 15.00
        ];

        // Create the trip
        $trip = Trip::create($tripData);

        // Assert the trip was created with correct data
        $this->assertDatabaseHas('trips', [
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'available_seats' => 3
        ]);

        $this->assertEquals($tripData['price'], $trip->price);
        $this->assertEquals(3, $trip->available_seats);
        
        // Test JSON fields are properly stored
        $this->assertJson($trip->start_point);
        $this->assertJson($trip->end_point);
    }
}
