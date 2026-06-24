<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'manager_id', 'name', 'slug', 'description', 'address', 
        'latitude', 'longitude', 'registration_paper', 'vat_pan_number',
        'commission_rate', 'is_approved'
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'commission_rate' => 'decimal:2',
        'is_approved' => 'boolean',
    ];

    public function manager() {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
