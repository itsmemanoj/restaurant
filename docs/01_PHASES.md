# Development Phases

Building this complex multi-restaurant platform requires a structured, phased approach to ensure scalability, quality, and maintainability.

## Phase 1: Planning and Architecture (Current)
- Document the overall architecture and system design.
- Define the PostgreSQL database schema.
- Outline the GraphQL API queries and mutations.
- Detail the integration strategies for third-party services (Payments, Deliveries).

## Phase 2: Web App UI/UX Prototyping
- Scaffold the Next.js frontend repository.
- Implement the mobile-first, high-performance landing page and marketing pages using Tailwind CSS.
- Integrate Framer Motion for modern, clean UI animations.
- Design the structural layouts for the Customer Account, Restaurant Detail, and Checkout pages.

## Phase 3: Backend Foundation (Laravel & Database)
- Initialize the Laravel project.
- Configure PostgreSQL and Redis connections.
- Write database migrations and seeders based on the planned schema.
- Implement the Eloquent models with appropriate relationships.

## Phase 4: Core GraphQL API Implementation
- Install and configure `nuwave/lighthouse`.
- Implement user authentication (JWT or Laravel Sanctum).
- Develop GraphQL Queries for listing restaurants, menus, items, and venues.
- Develop GraphQL Mutations for order creation, restaurant signup, and cart management.

## Phase 5: Admin Panel & Backoffice
- Build a secure internal interface (using Filament or Nova, or a custom React dashboard) for platform administrators.
- Implement approval workflows for newly registered restaurants.
- Build the commission calculation and payout management interfaces.

## Phase 6: Web Application Integration
- Connect the Next.js web application to the Laravel GraphQL API via Apollo Client or URQL.
- Implement state management for the cart and user sessions.
- Finalize the checkout process, integrating the placeholder payment gateways (eSewa, Khalti).

## Phase 7: Mobile Application (React Native)
- Scaffold the React Native application.
- Build the Customer interface (Browsing, Cart, Order Tracking, Subscriptions).
- Build the Restaurant Manager interface (Accept/Reject Orders, Mark Tiffin deliveries, Update Menu Availability).
- Connect to the GraphQL API.

## Phase 8: Integrations & Delivery Logistics
- Finalize the eSewa and Khalti end-to-end webhook/callback flows.
- Integrate Upaya / Nepal Can Move APIs for order dispatching and live status tracking.
- Set up automated email queues and push notifications for order updates.

## Phase 9: Testing, Optimization & Deployment
- Conduct load testing to ensure the platform handles high traffic efficiently.
- Optimize database queries and implement Redis caching for heavy reads (e.g., popular restaurants, menus).
- Deploy to a scalable infrastructure (e.g., AWS, Vercel for Frontend, Forge/Vapor for Backend).
