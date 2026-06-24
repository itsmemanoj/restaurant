# Database Schema (PostgreSQL)

This document outlines the core relational database schema to support the multi-restaurant platform.

## Core Tables

### `users`
Handles both Customers, Admins, and Restaurant Managers based on roles.
- `id` (UUID, PK)
- `name` (String)
- `email` (String, Unique)
- `phone` (String, Unique)
- `password` (String)
- `role` (Enum: `admin`, `customer`, `restaurant_manager`)
- `created_at`, `updated_at`

### `restaurants`
- `id` (UUID, PK)
- `manager_id` (UUID, FK -> users.id)
- `name` (String)
- `slug` (String, Unique)
- `description` (Text)
- `address` (String)
- `latitude` (Decimal), `longitude` (Decimal)
- `registration_paper` (String, URL)
- `vat_pan_number` (String)
- `commission_rate` (Decimal, default from platform settings)
- `is_approved` (Boolean, default: false)
- `created_at`, `updated_at`

## Menu & Items

### `menu_categories`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `name` (String)
- `sort_order` (Integer)

### `items`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `category_id` (UUID, FK -> menu_categories.id)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `image_url` (String)
- `is_available` (Boolean, default: true)
- `dietary_preference` (Enum: `veg`, `non-veg`, `vegan`, null)

### `addons`
- `id` (UUID, PK)
- `item_id` (UUID, FK -> items.id)
- `name` (String)
- `price` (Decimal)

## Orders

### `orders`
- `id` (UUID, PK)
- `order_number` (String, Unique)
- `user_id` (UUID, FK -> users.id, Nullable for Guest Checkout)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `subtotal` (Decimal)
- `tax` (Decimal)
- `delivery_fee` (Decimal)
- `discount` (Decimal)
- `total` (Decimal)
- `commission_amount` (Decimal)
- `status` (Enum: `pending`, `approved`, `preparing`, `ready_for_pickup`, `out_for_delivery`, `delivered`, `cancelled`)
- `payment_method` (Enum: `cod`, `esewa`, `khalti`)
- `payment_status` (Enum: `pending`, `paid`, `failed`)
- `shipping_api_reference` (String, Nullable)
- `created_at`, `updated_at`

### `order_items`
- `id` (UUID, PK)
- `order_id` (UUID, FK -> orders.id)
- `item_id` (UUID, FK -> items.id)
- `quantity` (Integer)
- `price` (Decimal)
- `addon_ids` (JSONB) // Stores array of selected addon IDs and their snapshotted prices

## Tiffin & Subscriptions

### `tiffin_plans`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `name` (String)
- `description` (Text)
- `monthly_price` (Decimal)
- `meals_per_day` (Integer)

### `tiffin_subscriptions`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `plan_id` (UUID, FK -> tiffin_plans.id)
- `start_date` (Date)
- `end_date` (Date)
- `status` (Enum: `active`, `expired`, `cancelled`)
- `payment_status` (Enum: `pending`, `paid`)

### `tiffin_deliveries`
Tracks daily deliveries for active subscriptions.
- `id` (UUID, PK)
- `subscription_id` (UUID, FK -> tiffin_subscriptions.id)
- `delivery_date` (Date)
- `status` (Enum: `scheduled`, `delivered`, `missed`)

## Venue Booking

### `venues`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `name` (String)
- `capacity` (Integer)
- `hourly_price` (Decimal, Nullable)
- `daily_price` (Decimal, Nullable)
- `package_price` (Decimal, Nullable)

### `venue_bookings`
- `id` (UUID, PK)
- `venue_id` (UUID, FK -> venues.id)
- `user_id` (UUID, FK -> users.id)
- `start_time` (Timestamp)
- `end_time` (Timestamp)
- `status` (Enum: `pending_approval`, `approved`, `rejected`, `cancelled`)
- `event_type` (String) // e.g. Marriage, Party
- `guest_count` (Integer)

## Promotions & Admin

### `coupons`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `code` (String, Unique)
- `discount_type` (Enum: `percentage`, `fixed`)
- `discount_value` (Decimal)
- `valid_from` (Timestamp)
- `valid_until` (Timestamp)

### `payouts`
Admin tracking for paying out restaurants.
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `amount` (Decimal)
- `status` (Enum: `pending`, `processing`, `completed`)
- `period_start` (Date)
- `period_end` (Date)
