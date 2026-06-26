import { gql } from 'graphql-request';

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants(first: 10) {
      data {
        id
        name
        slug
        description
        address
        is_approved
      }
    }
  }
`;

export const GET_RESTAURANT_DETAILS = gql`
  query GetRestaurantDetails($slug: String!) {
    restaurant(slug: $slug) {
      id
      name
      slug
      description
      address
      categories {
        id
        name
        items {
          id
          name
          description
          price
          is_available
        }
      }
    }
  }
`;

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    myOrders(first: 20) {
      data {
        id
        order_number
        total
        status
        payment_status
        created_at
      }
    }
  }
`;
