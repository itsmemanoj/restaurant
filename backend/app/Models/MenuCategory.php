<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['restaurant_id', 'name', 'sort_order'];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function items() {
        return $this->hasMany(Item::class, 'category_id');
    }
}
