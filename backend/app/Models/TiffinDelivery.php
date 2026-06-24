<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiffinDelivery extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['subscription_id', 'delivery_date', 'status'];

    protected $casts = [
        'delivery_date' => 'date',
    ];

    public function subscription() {
        return $this->belongsTo(TiffinSubscription::class, 'subscription_id');
    }
}
