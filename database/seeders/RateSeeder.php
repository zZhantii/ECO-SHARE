<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Trip;
use Illuminate\Database\Seeder;

class RateSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('id', '>', 1)->get();
        
        $trips = Trip::all();

        $users[0]->rates()->attach([
            $trips[0]->id => ['rate' => 4],
            $trips[2]->id => ['rate' => 5]
        ]);

        $users[1]->rates()->attach([
            $trips[0]->id => ['rate' => 5],
            $trips[3]->id => ['rate' => 4]
        ]);

        $users[2]->rates()->attach([
            $trips[1]->id => ['rate' => 3]
        ]);

        $users[3]->rates()->attach([
            $trips[1]->id => ['rate' => 4]
        ]);
    }
}