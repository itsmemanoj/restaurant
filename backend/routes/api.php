<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\PaymentController;

Route::get('/payments/esewa/callback', [PaymentController::class, 'esewaCallback']);
Route::post('/payments/khalti/webhook', [PaymentController::class, 'khaltiWebhook']);
