<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Models\Item;
use App\Models\Addon;
use App\Models\TiffinPlan;
use App\Models\Venue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@foodapp.com',
            'phone' => '9800000000',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create Restaurant Manager
        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager@foodapp.com',
            'phone' => '9800000001',
            'password' => Hash::make('password'),
            'role' => 'restaurant_manager',
        ]);

        // Create Customer
        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'customer@foodapp.com',
            'phone' => '9800000002',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        // Create a Restaurant
        $restaurant = Restaurant::create([
            'manager_id' => $manager->id,
            'name' => 'Burger House & Cafe',
            'slug' => 'burger-house',
            'description' => 'Best burgers and crispy chicken in town.',
            'address' => 'Kathmandu, Nepal',
            'latitude' => 27.7172,
            'longitude' => 85.3240,
            'registration_paper' => 'doc1.pdf',
            'vat_pan_number' => '123456789',
            'commission_rate' => 10.00,
            'is_approved' => true,
        ]);

        // Create Menu Categories
        $burgerCategory = MenuCategory::create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Burgers',
            'sort_order' => 1,
        ]);

        $drinksCategory = MenuCategory::create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Drinks',
            'sort_order' => 2,
        ]);

        // Create Items
        $chickenBurger = Item::create([
            'restaurant_id' => $restaurant->id,
            'category_id' => $burgerCategory->id,
            'name' => 'Crispy Chicken Burger',
            'description' => 'Fried chicken patty with fresh lettuce and mayo.',
            'price' => 250.00,
            'is_available' => true,
            'dietary_preference' => 'non-veg',
        ]);

        $coke = Item::create([
            'restaurant_id' => $restaurant->id,
            'category_id' => $drinksCategory->id,
            'name' => 'Coca Cola',
            'description' => 'Chilled 250ml Coke.',
            'price' => 50.00,
            'is_available' => true,
            'dietary_preference' => 'veg',
        ]);

        // Create Addon
        Addon::create([
            'item_id' => $chickenBurger->id,
            'name' => 'Extra Cheese',
            'price' => 30.00,
        ]);

        // Create Tiffin Plan
        TiffinPlan::create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Student Monthly Plan',
            'description' => '2 meals a day for 30 days.',
            'monthly_price' => 4500.00,
            'meals_per_day' => 2,
        ]);

        // Create Venue
        Venue::create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Main Banquet Hall',
            'capacity' => 100,
            'hourly_price' => 1000.00,
            'daily_price' => 15000.00,
        ]);
    }
}
