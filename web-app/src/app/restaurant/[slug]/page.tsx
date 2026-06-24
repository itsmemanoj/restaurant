"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, Plus } from "lucide-react";

import { use } from "react";

export default function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  // Mock data for the prototype
  const restaurantName = unwrappedParams.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-neutral-900 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
          alt="Restaurant Cover" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{restaurantName || "The Rustic Grill"}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-orange-400 fill-orange-400" /> 4.8 (240+ reviews)</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Thamel, Kathmandu</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10:00 AM - 10:00 PM</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Menu) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-6 border-b border-neutral-200 pb-2 overflow-x-auto no-scrollbar">
            <button className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-2 whitespace-nowrap">Order Online</button>
            <button className="text-neutral-500 hover:text-neutral-900 font-medium pb-2 whitespace-nowrap">Tiffin Plans</button>
            <button className="text-neutral-500 hover:text-neutral-900 font-medium pb-2 whitespace-nowrap">Book Venue</button>
            <button className="text-neutral-500 hover:text-neutral-900 font-medium pb-2 whitespace-nowrap">Reviews</button>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            <MenuSection title="Popular Items" items={mockItems} />
            <MenuSection title="Main Course" items={mockItems} />
          </div>
        </div>

        {/* Sidebar (Cart & Info) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <div className="text-center py-10 text-neutral-400">
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add items to get started</p>
            </div>
            <button className="w-full py-3 bg-neutral-200 text-neutral-400 rounded-xl font-medium cursor-not-allowed mt-4">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function MenuSection({ title, items }: { title: string, items: { name: string; desc: string; price: string; img: string; }[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h3 className="text-2xl font-bold mb-6 text-neutral-900">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-neutral-100 hover:border-orange-200 hover:shadow-md transition-all flex justify-between gap-4 group cursor-pointer">
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 mb-1">{item.name}</h4>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{item.desc}</p>
              <span className="font-bold text-neutral-900">Rs. {item.price}</span>
            </div>
            <div className="relative w-28 h-28 flex-shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
              <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 border border-neutral-200 shadow-sm px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 group-hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const mockItems = [
  { name: "Chicken Momo", desc: "Steamed dumplings filled with minced chicken and traditional spices.", price: "250", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&q=80" },
  { name: "Margherita Pizza", desc: "Classic pizza with san marzano tomato sauce and fresh mozzarella.", price: "650", img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80" },
  { name: "Grilled Burger", desc: "Double beef patty with melted cheese, lettuce, and house sauce.", price: "450", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { name: "Caesar Salad", desc: "Crisp romaine, parmesan cheese, croutons, and Caesar dressing.", price: "350", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=80" },
];
