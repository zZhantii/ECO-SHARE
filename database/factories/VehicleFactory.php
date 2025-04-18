<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
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
            'plate' => fake()->regexify('[0-9]{4}[A-Z]{3}'),
            'brand' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'BMW', 'Volkswagen', 'Audi']),
            'model' => fake()->randomElement(['Civic', 'Corolla', 'Golf', 'A3', '320i', 'Focus']),
            'consumption' => fake()->randomFloat(2, 4, 12),
            'pax_number' => fake()->numberBetween(2, 7),
            'validation' => fake()->boolean(),
            'fuel_type' => fake()->randomElement(['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'])
        ];
    }
}
