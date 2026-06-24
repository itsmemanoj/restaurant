<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'order_number', 'user_id', 'restaurant_id', 'subtotal', 'tax',
        'delivery_fee', 'discount', 'total', 'commission_amount', 'status',
        'payment_method', 'payment_status', 'shipping_api_reference'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'commission_amount' => 'decimal:2',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }
}
