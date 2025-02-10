<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'Prohibido Mascotas',
            'Prohibido Fumar',
            'Prohibido Beber',
            'Prohibido Comer',
            'Prohibido Menores'
        ];

        foreach ($tags as $tag) {
            Tag::create(['tag_name' => $tag]);
        }
    }
}
