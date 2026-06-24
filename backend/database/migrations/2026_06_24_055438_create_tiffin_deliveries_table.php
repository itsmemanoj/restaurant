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
        Schema::create('tiffin_deliveries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('subscription_id')->constrained('tiffin_subscriptions')->onDelete('cascade');
            $table->date('delivery_date');
            $table->enum('status', ['scheduled', 'delivered', 'missed'])->default('scheduled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiffin_deliveries');
    }
};
