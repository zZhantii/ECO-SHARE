<?php

use App\Http\Controllers\api\AppController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PostControllerAdvance;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\TripReserveController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('forget.password.post');
Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');

Route::group(['middleware' => 'auth:sanctum'], function () {


    Route::apiResource('users', UserController::class);

    // Route::post('users/updateimg', [UserController::class, 'updateimg']); //Listar

    Route::apiResource('posts', PostControllerAdvance::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('roles', RoleController::class);

    Route::get('role-list', [RoleController::class, 'getList']);
    Route::get('role-permissions/{id}', [PermissionController::class, 'getRolePermissions']);
    Route::put('/role-permissions', [PermissionController::class, 'updateRolePermissions']);
    Route::apiResource('permissions', PermissionController::class);


    //Rutas App

    //Conseguir todos los vehículos del usuario autenticado
    Route::get("app/user-vehicle", [AppController::class, "indexVehicle"]);
    //Conseguir todos los viajes activos del usuario como conductor

    //Conseguir todos los viajes activos del usuario como pasejero

    //Subir img/avatar del usuario
    Route::post("user-avatar", [ProfileController::class, "uploadAvatar"]);
    //Eliminar imagen/avatar de usuario
    Route::delete("delete-avatar", [ProfileController::class, "unlinkAvatar"]);

    Route::put('vehicle/{vehicle}', [VehicleController::class, 'update']);
    Route::get('vehicle', [VehicleController::class, 'index']);
    Route::post("vehicle", [VehicleController::class, "store"]);
    Route::get('vehicle/{vehicle}', [VehicleController::class, 'show']);
    Route::delete('vehicle/{vehicle}', [VehicleController::class, 'destroy']);


    // Trips
    Route::get("trip", [TripController::class, 'index']);
    Route::get("trip/{trip}", [TripController::class, 'show']);
    Route::get('/trips/search', [TripController::class, 'searchTrip']);
    Route::post("trip", [TripController::class, 'store']);
    Route::post("trip/reserve/{trip}", [TripController::class, 'reserve']);
    Route::put("trip/{trip}", [TripController::class, 'updateSeats']);

    Route::get('category-list', [CategoryController::class, 'getList']);
    Route::get('user', [ProfileController::class, 'user']);
    Route::put('user', [ProfileController::class, 'update']);
    Route::get('user/{user}', [UserController::class, 'show']);

    //Tags
    Route::get("tag", [TagController::class, "index"]);


    Route::get('abilities', function (Request $request) {
        return $request->user()->roles()->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique()
            ->values()
            ->toArray();
    });
});

Route::get('category-list', [CategoryController::class, 'getList']);

Route::get('get-posts', [PostControllerAdvance::class, 'getPosts']);
Route::get('get-category-posts/{id}', [PostControllerAdvance::class, 'getCategoryByPosts']);
Route::get('get-post/{id}', [PostControllerAdvance::class, 'getPost']);

Route::get("author", [AuthorController::class, 'index']);
Route::post("author", [AuthorController::class, "store"]);
Route::delete("author/{author}", [AuthorController::class, "destroy"]);
Route::put("author/{author}", [AuthorController::class, "update"]);
Route::get("author/{author}", [AuthorController::class, "show"]);








Route::get("app/driver-trip-active", [AppController::class, "indexDriverTrips"]);



