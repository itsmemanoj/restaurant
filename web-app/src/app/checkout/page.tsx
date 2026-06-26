"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { graphqlClient } from "@/lib/graphql-client";
import { CREATE_ORDER } from "@/graphql/mutations";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Your cart is empty.</p>
      </div>
    );
  }

  const subtotal = getTotal();
  const tax = subtotal * 0.13;
  const delivery = 50;
  const grandTotal = subtotal + tax + delivery;

  const handleCheckout = async (paymentMethod: string) => {
    setLoading(true);
    setError("");

    try {
      const orderItems = items.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
      }));

      const variables = {
        restaurantId: items[0].restaurantId,
        items: orderItems,
        paymentMethod: paymentMethod
      };

      const response: any = await graphqlClient.request(CREATE_ORDER, variables);
      
      if (response?.createOrder?.id) {
        clearCart();
        alert(`Order placed successfully! Order Number: ${response.createOrder.order_number}`);
        router.push("/account");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">Rs. {item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-8 text-right">
          <p className="text-gray-600">Subtotal: Rs. {subtotal.toFixed(2)}</p>
          <p className="text-gray-600">Tax (13%): Rs. {tax.toFixed(2)}</p>
          <p className="text-gray-600">Delivery: Rs. {delivery.toFixed(2)}</p>
          <p className="text-xl font-bold mt-4">Total: Rs. {grandTotal.toFixed(2)}</p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex gap-4 justify-end">
          <button 
            disabled={loading}
            onClick={() => handleCheckout('cod')}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Cash on Delivery
          </button>
          <button 
            disabled={loading}
            onClick={() => handleCheckout('esewa')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Pay with eSewa
          </button>
        </div>
      </div>
    </div>
  );
}
