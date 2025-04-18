<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class TripFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'start_point' => json_encode([
                'address' => $this->faker->address(),
                'lat' => $this->faker->latitude(),
                'lng' => $this->faker->longitude()
            ]),
            'end_point' => json_encode([
                'address' => $this->faker->address(),
                'lat' => $this->faker->latitude(),
                'lng' => $this->faker->longitude()
            ]),
            'departure_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'arrival_time' => $this->faker->dateTimeBetween('+1 week', '+1 week +6 hours'),
            'available_seats' => $this->faker->numberBetween(1, 4),
            'price' => $this->faker->randomFloat(2, 5, 50)
        ];
    }
}