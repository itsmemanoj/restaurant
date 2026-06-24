<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id', 'amount', 'status', 'period_start', 'period_end'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'period_start' => 'date',
        'period_end' => 'date',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
