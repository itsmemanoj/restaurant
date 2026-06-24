<?php

namespace App\GraphQL\Queries;

use App\Models\VenueBooking;
use Illuminate\Database\Eloquent\Builder;

final class MyVenueBookings
{
    public function __invoke($_, array $args): Builder
    {
        return VenueBooking::where('user_id', auth()->id())->orderBy('created_at', 'desc');
    }
}
