<?php

namespace App\GraphQL\Queries;

use App\Models\Restaurant;
use Illuminate\Support\Facades\Cache;

final class GetRestaurantsCached
{
    public function __invoke($_, array $args)
    {
        return Cache::remember('restaurants.all', 60 * 5, function () {
            return Restaurant::where('is_approved', true)->get();
        });
    }
}
