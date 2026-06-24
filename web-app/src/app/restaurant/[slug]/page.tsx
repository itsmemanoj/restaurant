"use client";

import { useCartStore } from "@/store/cartStore";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { graphqlClient } from "@/lib/graphql-client";
import { gql } from "graphql-request";

const GET_RESTAURANT_DETAILS = gql`
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

export default function RestaurantDetail() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
    graphqlClient.request(GET_RESTAURANT_DETAILS, { slug })
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  if (!mounted) return null;
  if (loading) return <div className="p-8">Loading menu...</div>;
  if (error) return <div className="p-8 text-red-500">Failed to load menu.</div>;

  const restaurant = data?.restaurant;
  if (!restaurant) return <div className="p-8">Restaurant not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-600 mt-2">{restaurant.description}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-8">
        {restaurant.categories.map((category: any) => (
          <div key={category.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="space-y-4">
              {category.items.map((item: any) => (
                <motion.div 
                  whileHover={{ x: 5 }}
                  key={item.id} 
                  className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="font-bold mt-1">Rs. {item.price}</p>
                  </div>
                  <button
                    onClick={() => addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                      restaurantId: restaurant.id
                    })}
                    className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
