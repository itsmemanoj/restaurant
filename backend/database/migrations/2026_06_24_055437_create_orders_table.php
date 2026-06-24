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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('order_number')->unique();
            $table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignUuid('restaurant_id')->constrained('restaurants')->onDelete('restrict');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2);
            $table->decimal('delivery_fee', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->decimal('commission_amount', 10, 2);
            $table->enum('status', ['pending', 'approved', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_method', ['cod', 'esewa', 'khalti']);
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('shipping_api_reference')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
