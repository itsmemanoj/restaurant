<!DOCTYPE html>
<html>
<head>
    <title>Order Placed</title>
</head>
<body>
    <h1>Thank you for your order!</h1>
    <p>Your order number is: <strong>{{ $order->order_number }}</strong></p>
    <p>Total amount: Rs. {{ $order->total }}</p>
    <p>We will notify you once the restaurant accepts your order.</p>
</body>
</html>
