<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReserveFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'trip_id' => Trip::factory(),
            'seats_reserved' => $this->faker->numberBetween(1, 4),
            'reservation_date' => now(),
            'price' => $this->faker->randomFloat(2, 5, 50)
        ];
    }
}