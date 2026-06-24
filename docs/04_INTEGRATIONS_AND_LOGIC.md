# Integrations & Business Logic

This document details the logic and external integration workflows required for the multi-restaurant platform.

## 1. Payment Integrations (eSewa & Khalti)

Since the application uses a decoupled frontend, the payment flow requires careful orchestration between the Frontend, the Laravel Backend, and the Payment Gateways.

### Standard Order Flow
1. **Initiate Payment (Frontend)**: User selects eSewa/Khalti during checkout. The frontend calls the `createOrder` GraphQL mutation.
2. **Order Creation (Backend)**: Laravel creates the order with `payment_status = 'pending'`. It returns the `order_number`, `total_amount`, and signature/hashes required by the gateway.
3. **Redirection (Frontend)**: The frontend redirects the user to the eSewa/Khalti payment portal, passing the required parameters.
4. **Callback Processing (Backend)**:
   - Upon successful payment, the gateway redirects the user back to the frontend success page.
   - The gateway also hits a secure webhook/API endpoint on the Laravel backend.
   - Laravel verifies the transaction signature/token using the respective gateway's verification API.
   - If valid, `payment_status` is updated to `'paid'`.
   - Appropriate queues (e.g., `SendOrderSuccessEmail`, `NotifyRestaurantManager`) are dispatched.

## 2. Delivery Logistics (Upaya / Nepal Can Move)

Deliveries are handled by 3rd party APIs.

### Workflow
1. **Order Approval**: When a Restaurant Manager updates the order status to `preparing` or `ready_for_pickup`, the backend automatically triggers an API call to the shipping provider.
2. **Dispatch Request**: The payload includes:
   - Pickup Location (Restaurant Address & Lat/Lng)
   - Drop-off Location (Customer Address & Lat/Lng)
   - Package Details (Weight/Type based on items)
   - Order Value (for COD or insurance)
3. **Tracking Integration**: The shipping provider returns a tracking ID and Tracking URL. We store this `shipping_api_reference` in the `orders` table.
4. **Status Webhooks**: As the delivery driver updates the status (e.g., picked up, delivered), the shipping API sends webhooks to Laravel, which in turn updates the order `status` and notifies the customer.

## 3. Venue Booking Logic

Venues do not require upfront payment but require manual approval and calendar availability.

### Booking Flow
1. **Availability Check**: Before booking, the frontend queries `venueAvailability` to ensure the requested date/time does not conflict with existing `approved` bookings.
2. **Request Submission**: User submits booking details (event type, guest count, start/end time).
3. **Manager Approval**: The booking is saved as `pending_approval`. The Restaurant Manager sees the request in their dashboard.
4. **Action**:
   - If **Approved**: The calendar is blocked off for those times. A confirmation email is sent to the customer.
   - If **Rejected**: The slot remains open.

## 4. Tiffin Subscription Logic

Tiffin services act as a prepaid monthly plan.

### Lifecycle
1. **Subscription**: Customer purchases a Tiffin plan (e.g., 30 days). Payment is processed upfront.
2. **Daily Tracking**:
   - A cron job runs nightly to generate `tiffin_deliveries` records for the upcoming day for all `active` subscriptions.
   - Restaurant Managers use the mobile app or dashboard to see a list of all active tiffin subscribers requiring meals today.
3. **Marking Delivery**: As meals are dispatched/delivered, the manager marks the daily record as `delivered`.
4. **Expiration**: After 30 days, the subscription ends. The frontend will prompt the user to renew.

## 5. Commission & Payout Logic

The platform takes a cut from every order.

### Calculation
- When an order is completed, the backend calculates the platform commission based on the `restaurants.commission_rate` (e.g., 10%).
- `orders.commission_amount = orders.subtotal * 0.10`

### Payouts
- A monthly scheduled job calculates the total revenue for a restaurant minus the commissions.
- Admin reviews the generated `payouts` records and processes the actual bank transfers offline.
- Once transferred, Admin marks the payout as `completed`.
