<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

final class CreateOrder
{
    public function __invoke($_, array $args)
    {
        return DB::transaction(function () use ($args) {
            $restaurant = Restaurant::findOrFail($args['restaurant_id']);
            $subtotal = 0;
            
            // Generate order number
            $orderNumber = 'ORD-' . strtoupper(Str::random(8));

            // Create Order skeleton
            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => auth()->id(), // Optional, could be guest
                'restaurant_id' => $restaurant->id,
                'subtotal' => 0, // Calculated below
                'tax' => 0,
                'delivery_fee' => 50.00, // Fixed for simplicity
                'discount' => 0,
                'total' => 0,
                'commission_amount' => 0,
                'status' => 'pending',
                'payment_method' => $args['payment_method'],
                'payment_status' => 'pending',
            ]);

            foreach ($args['items'] as $itemInput) {
                $item = Item::findOrFail($itemInput['item_id']);
                $price = $item->price;
                $addonPrice = 0;
                
                // Simplified addon calculation (just array of ids, ignoring actual addon fetching for prototype)
                if (isset($itemInput['addon_ids'])) {
                    $addonPrice = count($itemInput['addon_ids']) * 30.00; // Fake 30 fixed price
                }
                
                $itemTotal = ($price + $addonPrice) * $itemInput['quantity'];
                $subtotal += $itemTotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'quantity' => $itemInput['quantity'],
                    'price' => $price + $addonPrice,
                    'addon_ids' => $itemInput['addon_ids'] ?? null,
                ]);
            }

            // Finalize totals
            $tax = $subtotal * 0.13; // 13% tax
            $total = $subtotal + $tax + $order->delivery_fee;
            $commission = $subtotal * ($restaurant->commission_rate / 100);

            $order->update([
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'commission_amount' => $commission
            ]);

            return $order;
        });
    }
}
