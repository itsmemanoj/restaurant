<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id', 'category_id', 'name', 'description', 
        'price', 'image_url', 'is_available', 'dietary_preference'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function category() {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }

    public function addons() {
        return $this->hasMany(Addon::class);
    }
}
