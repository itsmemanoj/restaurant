<?php

namespace App\GraphQL\Mutations;

use App\Models\VenueBooking;

final class ApproveVenueBooking
{
    public function __invoke($_, array $args)
    {
        $booking = VenueBooking::findOrFail($args['id']);
        // Add authorization check here if needed to ensure only restaurant manager can approve
        $booking->update(['status' => 'approved']);
        return $booking;
    }
}
