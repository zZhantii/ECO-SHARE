<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reserves', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('trip_id')->unsigned();
            $table->integer('seats_reserved');
            $table->timestamp('reservation_date')->useCurrent();
            $table->boolean('check_in')->default(false);
            $table->timestamps();

            $table->primary(['user_id', 'trip_id']);
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('trip_id')->references('trip_id')->on('trips');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reserves');
    }
};
