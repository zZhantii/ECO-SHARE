<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Trip;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReserveTest extends TestCase
{
    use RefreshDatabase;

    public function test_reserve_create(): void
    {
       $user = User::factory()->create();
        $trip = Trip::factory()->create();

        $user->reserves()->attach($trip->id, [
            'seats_reserved' => 2,
            'reservation_date' => now(),
            'total_price' => 25.00,
            'check_in' => null
        ]);

        $this->assertDatabaseHas('user_trips_reserves', [
            'user_id' => $user->id,
            'trip_id' => $trip->id,
            'seats_reserved' => 2,
            'total_price' => 25.00
        ]);

        $reserve = $user->reserves()->first();
        $this->assertEquals(2, $reserve->pivot->seats_reserved);
        $this->assertEquals(25.00, $reserve->pivot->total_price);
        $this->assertNull($reserve->pivot->check_in); 
    }
}
