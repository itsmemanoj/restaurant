# Multi-Restaurant Food Delivery & Venue Platform

A comprehensive, scalable multi-restaurant platform designed to handle online food ordering, tiffin subscriptions, and venue bookings. The system follows a decoupled architecture, leveraging a high-performance backend and modern frontend applications tailored for both the web and mobile devices.

## Architecture Overview

The system is built on a **Standalone Decoupled Architecture**:

- **Backend (API)**: Laravel (PHP) acting strictly as a GraphQL API server using `nuwave/lighthouse`.
- **Database**: PostgreSQL for robust relational data mapping.
- **Cache & Queues**: Redis for high-performance caching and background job processing (emails, order states).
- **Web Frontend**: Next.js (React) for a high-traffic, SEO-optimized, and performant user interface. Styled with Tailwind CSS and animated using Framer Motion.
- **Mobile Frontend**: React Native for a cross-platform mobile application targeting both Customers and Restaurant Managers.

## Core Features

- **Restaurant Module**: Self-signup (admin approval required), menu/item/addon management, venue booking calendar, and tiffin subscription plans.
- **Customer Experience**: Modern, mobile-first design, guest checkout, online payment (eSewa, Khalti) / COD, order tracking, and email notifications.
- **Admin Interface**: Secure management of restaurants, commissions, payouts, users, and platform settings.
- **Delivery Integration**: Integrated with third-party shipping APIs (Upaya / Nepal Can Move) for seamless logistics.

## Documentation Navigation

1. [Phased Development Plan](docs/01_PHASES.md)
2. [Database Schema](docs/02_DATABASE_SCHEMA.md)
3. [GraphQL API Design](docs/03_GRAPHQL_API.md)
4. [Integrations & Business Logic](docs/04_INTEGRATIONS_AND_LOGIC.md)
