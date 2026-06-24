<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiffinSubscription extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id', 'plan_id', 'start_date', 'end_date', 'status', 'payment_status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function plan() {
        return $this->belongsTo(TiffinPlan::class, 'plan_id');
    }

    public function deliveries() {
        return $this->hasMany(TiffinDelivery::class, 'subscription_id');
    }
}
