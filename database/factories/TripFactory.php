<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Trip;
use App\Models\Vehicle;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'start_point' => [
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'address' => $this->faker->address,
            ],
            'end_point' => [
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'address' => $this->faker->address,
            ],
            'departure_time' => $this->faker->dateTimeBetween('+1 hour', '+2 hours'),
            'arrival_time' => $this->faker->dateTimeBetween('+4 hour', '+5 hours'),
            'available_seats' => $this->faker->numberBetween(1, 5),
            'price' => $this->faker->randomFloat(2, 5, 50),
            'drive_start' => $this->faker->dateTimeBetween('+1 hour', '+2 hours'),
            'drive_end' => $this->faker->dateTimeBetween('+4 hour', '+5 hours'),
            'cancelled_at' => null,
        ];
    }
}
