<?php

namespace App\GraphQL\Queries;

use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;

final class MyOrders
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args): Builder
    {
        return Order::where('user_id', auth()->id())->orderBy('created_at', 'desc');
    }
}
