<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id', 'name', 'capacity', 'hourly_price', 'daily_price', 'package_price'
    ];

    protected $casts = [
        'hourly_price' => 'decimal:2',
        'daily_price' => 'decimal:2',
        'package_price' => 'decimal:2',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
