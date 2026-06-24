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
        Schema::create('payouts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'processing', 'completed'])->default('pending');
            $table->date('period_start');
            $table->date('period_end');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};
