<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use Exception;

final class CancelOrder
{
    public function __invoke($_, array $args)
    {
        $order = Order::findOrFail($args['id']);
        
        if ($order->user_id !== auth()->id()) {
            throw new Exception("Unauthorized");
        }

        if ($order->status !== 'pending') {
            throw new Exception("Cannot cancel order after it has been approved.");
        }

        $order->update(['status' => 'cancelled']);
        return $order;
    }
}
