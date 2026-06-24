<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['order_id', 'item_id', 'quantity', 'price', 'addon_ids'];

    protected $casts = [
        'price' => 'decimal:2',
        'addon_ids' => 'array',
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function item() {
        return $this->belongsTo(Item::class);
    }
}
