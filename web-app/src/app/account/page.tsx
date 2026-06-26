"use client";

import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_MY_ORDERS } from "@/graphql/queries";

export default function Account() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    // In a real app, we need to pass the Bearer token in headers. 
    // Assuming authStore logic for production.
    graphqlClient.request(GET_MY_ORDERS)
      .then((res: any) => {
        setOrders(res?.myOrders?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        // Might fail if not logged in
        setError("Failed to fetch orders. Please ensure you are logged in.");
        setLoading(false);
      });
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          
          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          {!loading && !error && orders.length === 0 && (
            <p className="text-gray-500">You have no past orders.</p>
          )}

          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold">{order.order_number}</p>
                  <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Rs. {order.total}</p>
                  <p className={`text-sm ${order.status === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                    {order.status.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
