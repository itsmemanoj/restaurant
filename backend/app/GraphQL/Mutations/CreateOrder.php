<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\Addon;
use App\Models\Restaurant;
use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Exception;

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
                'user_id' => auth()->id(), // Optional, could be guest checkout
                'restaurant_id' => $restaurant->id,
                'subtotal' => 0, // Calculated below
                'tax' => 0,
                'delivery_fee' => 50.00, // Fixed or calculated based on distance
                'discount' => 0,
                'total' => 0,
                'commission_amount' => 0,
                'status' => 'pending',
                'payment_method' => $args['payment_method'],
                'payment_status' => 'pending',
            ]);

            foreach ($args['items'] as $itemInput) {
                $item = Item::findOrFail($itemInput['item_id']);
                
                // Security: Ensure item belongs to the requested restaurant
                if ($item->restaurant_id !== $restaurant->id) {
                    throw new Exception("Item does not belong to the selected restaurant.");
                }

                $price = $item->price;
                $addonPrice = 0;
                
                // Dynamically calculate Addons
                if (isset($itemInput['addon_ids']) && count($itemInput['addon_ids']) > 0) {
                    $addons = Addon::whereIn('id', $itemInput['addon_ids'])
                                   ->where('item_id', $item->id)
                                   ->get();
                    
                    $addonPrice = $addons->sum('price');
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

            // Handle Coupon
            $discount = 0;
            if (isset($args['coupon_code'])) {
                $coupon = Coupon::where('code', $args['coupon_code'])
                    ->where('restaurant_id', $restaurant->id)
                    ->where(function ($query) {
                        $now = Carbon::now();
                        $query->whereNull('valid_until')
                              ->orWhere('valid_until', '>=', $now);
                    })->first();

                if ($coupon) {
                    if ($coupon->discount_type === 'percentage') {
                        $discount = $subtotal * ($coupon->discount_value / 100);
                    } else {
                        $discount = $coupon->discount_value;
                    }
                    // Cap discount at subtotal
                    $discount = min($discount, $subtotal);
                }
            }

            // Finalize totals
            $tax = ($subtotal - $discount) * 0.13; // 13% tax on discounted amount
            $total = ($subtotal - $discount) + $tax + $order->delivery_fee;
            $commission = $subtotal * ($restaurant->commission_rate / 100); // Commission usually on original subtotal

            $order->update([
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'commission_amount' => $commission
            ]);

            return $order;
        });
    }
}
