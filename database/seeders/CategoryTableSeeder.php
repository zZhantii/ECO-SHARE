<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Ciencia',
            'Educación',
            'Alimentación',
            'Programación',
            'Varios'
        ];


        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
