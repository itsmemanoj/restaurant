<?php

namespace App\GraphQL\Queries;

use App\Models\MenuCategory;
use Illuminate\Support\Facades\Cache;

final class GetMenuCached
{
    public function __invoke($_, array $args)
    {
        $restaurantId = $args['restaurant_id'];
        return Cache::remember("restaurant.{$restaurantId}.menu", 60 * 5, function () use ($restaurantId) {
            return MenuCategory::with('items.addons')->where('restaurant_id', $restaurantId)->get();
        });
    }
}
