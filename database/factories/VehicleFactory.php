<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\vehicle>
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
            'plate' => $this->faker->regexify('[0-9]{4}[A-Z]{3}'),
            'brand' => $this->faker->company,
            'fuel_type' => $this->faker->randomElement(['Gasolina', 'Diésel']),
            'model' => $this->faker->word,
            'consumption' => $this->faker->randomFloat(1, 3, 15),
            'pax_number' => $this->faker->numberBetween(2, 5),
            'validation' => $this->faker->boolean,
            'user_id' => User::factory(),
        ];
    }
}
