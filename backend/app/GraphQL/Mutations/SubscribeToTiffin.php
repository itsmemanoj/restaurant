<?php

namespace App\GraphQL\Mutations;

use App\Models\TiffinSubscription;
use App\Models\TiffinPlan;
use Carbon\Carbon;

final class SubscribeToTiffin
{
    public function __invoke($_, array $args)
    {
        $startDate = Carbon::parse($args['start_date']);
        $endDate = $startDate->copy()->addDays(30);

        return TiffinSubscription::create([
            'user_id' => auth()->id(),
            'plan_id' => $args['plan_id'],
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => 'active',
            'payment_status' => 'pending'
        ]);
    }
}
