<?php

namespace App\GraphQL\Mutations;

use App\Models\Restaurant;
use Illuminate\Support\Str;

final class RegisterRestaurant
{
    public function __invoke($_, array $args)
    {
        return Restaurant::create([
            'manager_id' => auth()->id(),
            'name' => $args['name'],
            'slug' => Str::slug($args['name']) . '-' . Str::random(4),
            'address' => $args['address'],
            'registration_paper' => $args['registration_paper'],
            'vat_pan_number' => $args['vat_pan_number'],
            'commission_rate' => 10.00, // default
            'is_approved' => false,
        ]);
    }
}
