<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Vehicle;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class VehicleControllerTest extends TestCase
{


    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_index_all_vehicles()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        Vehicle::factory()->count(5)->create(["user_id" => $user->id]);

        $response = $this->getJson("/api/vehicle");

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "success",
            "data" => [
                "*" => [
                    'id',
                    'plate',
                    'brand',
                    'fuel_type',
                    'model',
                    'consumption',
                    'pax_number',
                    'validation',
                    'user_id'
                ]
            ]
        ]);

        $response->assertJson(["success" => true]);
    }
}
