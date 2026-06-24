<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DeliveryService
{
    /**
     * Simulates dispatching the order to a third-party logistics provider
     * like Upaya or Nepal Can Move.
     */
    public function dispatchOrder(Order $order): bool
    {
        // Check if the order is already dispatched or not ready
        if ($order->status !== 'ready_for_pickup') {
            Log::warning("Cannot dispatch order {$order->order_number} because it is not ready for pickup.");
            return false;
        }

        try {
            // Simulate API Request to Logistics Provider
            // Http::post('https://api.upaya.com/v1/dispatch', ['order' => $order]);
            
            // Generate a fake tracking ID
            $trackingId = 'UPY-' . strtoupper(Str::random(10));
            
            $order->update([
                'status' => 'out_for_delivery',
                'shipping_api_reference' => $trackingId // We override or append this based on design
            ]);
            
            Log::info("Order {$order->order_number} successfully dispatched via Logistics Partner. Tracking ID: {$trackingId}");
            
            return true;
        } catch (\Exception $e) {
            Log::error("Failed to dispatch order {$order->order_number}: " . $e->getMessage());
            return false;
        }
    }
}
