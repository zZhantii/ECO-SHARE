<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('vehicle_id');


            $table->json('start_point');
            $table->json('end_point');
            $table->timestamp('departure_time');
            $table->timestamp('arrival_time');
            $table->integer('available_seats');
            $table->decimal('price', 10, 2);
            $table->timestamp("cancelled_at")->nullable();
            $table->timestamps();
            $table->timestamp('drive_start')->nullable();
            $table->timestamp('drive_end')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('vehicle_id')->references('id')->on('vehicles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
