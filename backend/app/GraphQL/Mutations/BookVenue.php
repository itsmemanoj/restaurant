<?php

namespace App\GraphQL\Mutations;

use App\Models\VenueBooking;

final class BookVenue
{
    public function __invoke($_, array $args)
    {
        return VenueBooking::create([
            'venue_id' => $args['venue_id'],
            'user_id' => auth()->id(),
            'start_time' => $args['start_time'],
            'end_time' => $args['end_time'],
            'event_type' => $args['event_type'],
            'guest_count' => $args['guest_count'],
            'status' => 'pending_approval'
        ]);
    }
}
