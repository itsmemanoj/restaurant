<!DOCTYPE html>
<html>
<head>
    <title>Order Status Update</title>
</head>
<body>
    <h1>Order Update</h1>
    <p>Your order ({{ $order->order_number }}) is now: <strong>{{ strtoupper(str_replace('_', ' ', $order->status)) }}</strong>.</p>
    @if($order->status == 'out_for_delivery')
        <p>Tracking Reference: {{ $order->shipping_api_reference }}</p>
    @endif
</body>
</html>
