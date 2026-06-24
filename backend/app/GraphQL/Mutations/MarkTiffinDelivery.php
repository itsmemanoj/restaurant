<?php

namespace App\GraphQL\Mutations;

use App\Models\TiffinDelivery;

final class MarkTiffinDelivery
{
    public function __invoke($_, array $args)
    {
        TiffinDelivery::updateOrCreate(
            [
                'subscription_id' => $args['subscription_id'],
                'delivery_date' => $args['date']
            ],
            ['status' => $args['status']]
        );

        return true;
    }
}
