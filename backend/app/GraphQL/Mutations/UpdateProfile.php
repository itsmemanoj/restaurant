<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Exception;

final class UpdateProfile
{
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        if (!$user) {
            throw new Exception('Unauthenticated');
        }

        $user->update([
            'name' => $args['name'],
            'phone' => $args['phone']
        ]);

        return $user;
    }
}
