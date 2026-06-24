<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VenueBooking extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'venue_id', 'user_id', 'start_time', 'end_time', 'status', 'event_type', 'guest_count'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function venue() {
        return $this->belongsTo(Venue::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
