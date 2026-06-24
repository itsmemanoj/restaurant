<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Exception;

final class Login
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (Auth::attempt(['email' => $args['email'], 'password' => $args['password']])) {
            $user = Auth::user();
            return $user->createToken('auth_token')->plainTextToken;
        }

        throw new Exception('Invalid credentials');
    }
}
