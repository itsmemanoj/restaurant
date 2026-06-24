# GraphQL API Design

The API uses `nuwave/lighthouse` in Laravel. Below is the proposed GraphQL schema outlining the core types, queries, and mutations necessary for the Web and Mobile applications.

## Types

```graphql
type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
}

type Restaurant {
    id: ID!
    name: String!
    slug: String!
    description: String
    address: String!
    latitude: Float
    longitude: Float
    is_approved: Boolean!
    categories: [MenuCategory!]! @hasMany
    items: [Item!]! @hasMany
    venues: [Venue!]! @hasMany
    tiffinPlans: [TiffinPlan!]! @hasMany
}

type MenuCategory {
    id: ID!
    name: String!
    items: [Item!]! @hasMany
}

type Item {
    id: ID!
    name: String!
    description: String
    price: Float!
    imageUrl: String
    isAvailable: Boolean!
    dietaryPreference: String
    addons: [Addon!]! @hasMany
}

type Addon {
    id: ID!
    name: String!
    price: Float!
}

type Order {
    id: ID!
    orderNumber: String!
    total: Float!
    status: String!
    paymentStatus: String!
    items: [OrderItem!]! @hasMany
    createdAt: DateTime!
}

type OrderItem {
    id: ID!
    item: Item! @belongsTo
    quantity: Int!
    price: Float!
}

type Venue {
    id: ID!
    name: String!
    capacity: Int!
    hourlyPrice: Float
    dailyPrice: Float
    packagePrice: Float
}

type VenueBooking {
    id: ID!
    venue: Venue! @belongsTo
    startTime: DateTime!
    endTime: DateTime!
    status: String!
}

type TiffinPlan {
    id: ID!
    name: String!
    monthlyPrice: Float!
    mealsPerDay: Int!
}

type TiffinSubscription {
    id: ID!
    plan: TiffinPlan! @belongsTo
    startDate: Date!
    endDate: Date!
    status: String!
}
```

## Queries

```graphql
type Query {
    # Users
    me: User @auth

    # Restaurants
    restaurants(search: String): [Restaurant!]! @paginate
    restaurant(slug: String! @eq): Restaurant @find

    # Orders (Customer & Manager)
    myOrders: [Order!]! @paginate
    restaurantOrders(restaurantId: ID!): [Order!]! @paginate

    # Tiffins
    myTiffinSubscriptions: [TiffinSubscription!]! @all

    # Venues
    venueAvailability(venueId: ID!, date: Date!): [VenueBooking!]!
    myVenueBookings: [VenueBooking!]! @all
}
```

## Mutations

```graphql
type Mutation {
    # Auth
    login(email: String!, password: String!): String! # Returns Token
    registerCustomer(name: String!, email: String!, password: String!): User!
    
    # Restaurant Onboarding
    registerRestaurant(
        name: String!, 
        address: String!, 
        registrationPaper: String!, 
        vatPanNumber: String!
    ): Restaurant!

    # Ordering
    createOrder(
        restaurantId: ID!
        items: [OrderItemInput!]!
        paymentMethod: String!
        couponCode: String
    ): Order!

    cancelOrder(orderId: ID!): Order!

    # Subscriptions & Bookings
    subscribeToTiffin(planId: ID!, startDate: Date!): TiffinSubscription!
    bookVenue(venueId: ID!, startTime: DateTime!, endTime: DateTime!, eventType: String!, guestCount: Int!): VenueBooking!

    # Manager Actions
    updateOrderStatus(orderId: ID!, status: String!): Order!
    approveVenueBooking(bookingId: ID!): VenueBooking!
    markTiffinDelivery(subscriptionId: ID!, date: Date!, status: String!): Boolean!
}

input OrderItemInput {
    itemId: ID!
    quantity: Int!
    addonIds: [ID!]
}
```
