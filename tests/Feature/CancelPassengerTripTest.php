<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Trip;
use Laravel\Sanctum\Sanctum;

class CancelPassengerTripTest extends TestCase
{
    use RefreshDatabase;
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_cancel_trip_as_passenger()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $trip = Trip::factory()->create();

        $user->reserves()->attach($trip->id, [
            "seats_reserved" => 1,
            "reservation_date" => now(),
            "check_in" => now(),
            "cancelled_at" => null,

        ]);
        $response = $this->putJson("api/app/cancel-passenger-trip/$trip->id");

        $response->assertStatus(409);
        $response->assertJson([
            "success" => false,
            "data" => "Has hecho check-in o ya has cancelado el viaje",
        ]);
        $user->reserves()->updateExistingPivot($trip->id, [
            "cancelled_at" => now(),
        ]);

        $response = $this->putJson("api/app/cancel-passenger-trip/{$trip->id}");
        $response->assertStatus(409);
        $response->assertJson([
            "success" => false,
            "data" => "Has hecho check-in o ya has cancelado el viaje",
        ]);

        $user->reserves()->updateExistingPivot($trip->id, [
            "cancelled_at" => null,
            "check_in" => null,
        ]);

        $response = $this->putJson("api/app/cancel-passenger-trip/{$trip->id}");

        $response->assertStatus(200);

    }
}
