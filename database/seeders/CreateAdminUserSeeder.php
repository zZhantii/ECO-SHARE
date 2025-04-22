<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'id' => 1,
            'name' => 'David',
            'surname1' => 'Herrera',
            'alias' => 'dherrera',
            'email' => 'admin@demo.com',
            'password' => bcrypt('12345678')
        ]);

        $role = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'user']);
        $permissions = [
            'post-list',
            'post-create',
            'post-edit',
            'post-delete',
            'post-list'
        ];
        $role2->syncPermissions($permissions);

        $permissions = Permission::pluck('id','id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);

        $users = [
            [
                'id' => 2,
                'name' => 'Santiago',
                'surname1' => 'García',
                'alias' => 'sgarcia',
                'email' => 'sgarcia@demo.com',
                'password' => bcrypt('12345678')
            ],
            [
                'id' => 3,
                'name' => 'María',
                'surname1' => 'López',
                'alias' => 'mlopez',
                'email' => 'mlopez@demo.com',
                'password' => bcrypt('12345678')
            ],
            [
                'id' => 4,
                'name' => 'Carlos',
                'surname1' => 'Martínez',
                'alias' => 'cmartinez',
                'email' => 'cmartinez@demo.com',
                'password' => bcrypt('12345678')
            ],
            [
                'id' => 5,
                'name' => 'Ana',
                'surname1' => 'Rodríguez',
                'alias' => 'arodriguez',
                'email' => 'arodriguez@demo.com',
                'password' => bcrypt('12345678')
            ]
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            $user->assignRole([$role2->id]);
        }

    }
}
