<?php

namespace App\GraphQL\Queries;

use App\Models\TiffinSubscription;
use Illuminate\Database\Eloquent\Builder;

final class MyTiffinSubscriptions
{
    public function __invoke($_, array $args): Builder
    {
        return TiffinSubscription::where('user_id', auth()->id())->orderBy('created_at', 'desc');
    }
}
