<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addon extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['item_id', 'name', 'price'];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function item() {
        return $this->belongsTo(Item::class);
    }
}
