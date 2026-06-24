<?php

namespace App\GraphQL\Queries;

use App\Models\VenueBooking;

final class VenueAvailability
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return VenueBooking::where('venue_id', $args['venue_id'])
            ->whereDate('start_time', $args['date'])
            ->whereIn('status', ['approved', 'pending_approval'])
            ->get();
    }
}
