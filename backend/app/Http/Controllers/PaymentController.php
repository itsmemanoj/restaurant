<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Handle eSewa Payment Callback
     */
    public function esewaCallback(Request $request)
    {
        // Example Response: ?oid=ORD-123&amt=100&refId=REF123
        $orderNumber = $request->input('oid');
        $amount = $request->input('amt');
        $referenceId = $request->input('refId');

        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        // In a real scenario, you'd verify the refId against eSewa verification endpoint
        // Simulate verification success:
        if ($order->total == $amount) {
            $order->update([
                'payment_status' => 'paid',
                'shipping_api_reference' => 'esewa:' . $referenceId
            ]);

            Log::info("eSewa payment successful for Order: {$orderNumber}");
            return response()->json(['message' => 'Payment verified successfully']);
        }

        return response()->json(['message' => 'Payment verification failed'], 400);
    }

    /**
     * Handle Khalti Payment Webhook
     */
    public function khaltiWebhook(Request $request)
    {
        // Khalti sends a JSON payload on their webhook
        $payload = $request->all();
        $orderNumber = $payload['product_identity'] ?? null;
        $transactionId = $payload['idx'] ?? null;

        if (!$orderNumber) {
            return response()->json(['message' => 'Invalid payload'], 400);
        }

        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        // Verify state is Completed
        if (isset($payload['state']['name']) && strtolower($payload['state']['name']) === 'completed') {
             $order->update([
                'payment_status' => 'paid',
                'shipping_api_reference' => 'khalti:' . $transactionId
            ]);
            
            Log::info("Khalti payment successful for Order: {$orderNumber}");
            return response()->json(['message' => 'Webhook received']);
        }

        return response()->json(['message' => 'Webhook received, status not completed']);
    }
}
