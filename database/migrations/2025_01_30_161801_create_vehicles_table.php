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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            // Foreign key
            $table->unsignedBigInteger('user_id');

            $table->string('plate')->unique();
            $table->string('brand');
            $table->string('model');
            $table->decimal('consumption', 5, 2)->nullable();
            $table->integer('pax_number');
            $table->boolean('validation')->default(false);
            $table->string('fuel_type');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
