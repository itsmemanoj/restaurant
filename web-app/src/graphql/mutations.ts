import { gql } from 'graphql-request';

export const CREATE_ORDER = gql`
  mutation CreateOrder($restaurantId: ID!, $items: [OrderItemInput!]!, $paymentMethod: String!) {
    createOrder(restaurant_id: $restaurantId, items: $items, payment_method: $paymentMethod) {
      id
      order_number
      total
      status
    }
  }
`;
