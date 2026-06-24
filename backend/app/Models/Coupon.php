<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id', 'code', 'discount_type', 'discount_value', 'valid_from', 'valid_until'
    ];

    protected $casts = [
        'discount_value' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
