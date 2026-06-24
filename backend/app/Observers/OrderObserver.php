<?php

namespace App\Observers;

use App\Models\Order;
use App\Mail\OrderPlaced;
use App\Mail\OrderStatusUpdated;
use App\Services\DeliveryService;
use Illuminate\Support\Facades\Mail;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        // Send email to customer (if they have an email)
        if ($order->user && $order->user->email) {
            Mail::to($order->user->email)->queue(new OrderPlaced($order));
        }
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        // Check if status actually changed
        if ($order->isDirty('status')) {
            
            // Automatically attempt dispatch if status changed to ready_for_pickup
            if ($order->status === 'ready_for_pickup') {
                $deliveryService = new DeliveryService();
                $deliveryService->dispatchOrder($order);
                // DispatchOrder updates the model again, so we'll catch the next event
                return; 
            }

            // Send status update email to customer
            if ($order->user && $order->user->email) {
                Mail::to($order->user->email)->queue(new OrderStatusUpdated($order));
            }
        }
    }
}
