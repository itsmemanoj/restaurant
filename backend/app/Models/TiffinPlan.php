<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiffinPlan extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id', 'name', 'description', 'monthly_price', 'meals_per_day'
    ];

    protected $casts = [
        'monthly_price' => 'decimal:2',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
