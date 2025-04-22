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
    use RefreshDatabase, WithFaker;
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_cancel_trip_as_passenger()
    {
        // Comprobación en caso de que conste una reserva en caso de haber hecho checkin con resultado false
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $trip = Trip::factory()->create();

        //Se generan check_in nulos de forma aleatoria
        $user->reserves()->attach($trip->id, [
            "seats_reserved" => 1,
            "reservation_date" => now(),
            "check_in" => $this->faker->optional(0.5)->dateTime(),
            "cancelled_at" => $this->faker->optional(0.2)->dateTime(),
            "trip_id" => $trip->id
        ]);

        $response = $this->putJson("api/app/cancel-passenger-trip/$trip->id");

        $reservation = $user->reserves()->where("trip_id", $trip->id)->first();
        \Log::info("check_in");
        \Log::info($reservation->pivot->check_in);
        \Log::info("cancell");
        \Log::info($reservation->pivot->cancelled_at);
        if ($reservation->pivot->check_in) {

            $response->assertStatus(409);
            $response->assertJson([
                "success" => false,
                "data" => "Has hecho check-in o ya has cancelado el viaje",
            ]);
        } else {
            // Comprobación en caso de que conste una reserva en caso de haber hecho anulación previa del viaje con resultado false
            if ($reservation->pivot->cancelled_at) {
                $response = $this->putJson("api/app/cancel-passenger-trip/{$trip->id}");
                $response->assertStatus(409);
                $response->assertJson([
                    "success" => false,
                    "data" => "Has hecho check-in o ya has cancelado el viaje",
                ]);
            } else {

                // Comprobación  que debe devolver true en caso que el viaje no este cancelado ni tenga checkin
                if (!$reservation->pivot->check_in && !$reservation->pivot->cancelled_at) {

                    $response = $this->putJson("api/app/cancel-passenger-trip/{$trip->id}");

                    $response->assertStatus(200);
                }
            }
        }








        // $user->reserves()->updateExistingPivot($trip->id, [
        //     "cancelled_at" => null,
        //     "check_in" => null,
        // ]);



    }
}
