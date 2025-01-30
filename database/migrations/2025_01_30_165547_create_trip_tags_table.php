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
        Schema::create('trip_tags', function (Blueprint $table) {
            $table->bigInteger('trip_id')->unsigned();
            $table->bigInteger('tag_id')->unsigned();
            $table->timestamps();

            $table->primary(['trip_id', 'tag_id']);
            $table->foreign('trip_id')->references('trip_id')->on('trips');
            $table->foreign('tag_id')->references('tag_id')->on('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_tags');
    }
};
