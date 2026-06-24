"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { graphqlClient } from "@/lib/graphql-client";
import { gql } from "graphql-request";

const GET_RESTAURANTS = gql`
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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    graphqlClient.request(GET_RESTAURANTS)
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Popular Restaurants</h1>
        
        {loading && <p>Loading restaurants...</p>}
        {error && <p className="text-red-500">Error loading restaurants.</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.restaurants?.data?.map((restaurant: any) => (
             <motion.div 
                whileHover={{ scale: 1.02 }}
                key={restaurant.id} 
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
             >
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <h2 className="text-xl font-bold">{restaurant.name}</h2>
                  <p className="text-gray-600 text-sm mb-4">{restaurant.address}</p>
                  <Link 
                    href={`/restaurant/${restaurant.slug}`}
                    className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    View Menu
                  </Link>
                </div>
             </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
