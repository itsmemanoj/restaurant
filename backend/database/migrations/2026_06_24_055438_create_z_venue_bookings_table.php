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
        Schema::create('venue_bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('venue_id')->constrained('venues')->onDelete('cascade');
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->enum('status', ['pending_approval', 'approved', 'rejected', 'cancelled'])->default('pending_approval');
            $table->string('event_type')->nullable(); // e.g. Marriage, Party
            $table->integer('guest_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_bookings');
    }
};
