"use client";

import { motion } from "framer-motion";
import { User, Package, Calendar, Clock, CreditCard, Settings, ChevronRight } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
          <p className="text-neutral-500">Manage your orders, subscriptions, and settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-1 space-y-2">
            <NavItem icon={<Package className="w-5 h-5" />} label="Recent Orders" active />
            <NavItem icon={<Clock className="w-5 h-5" />} label="Tiffin Subscriptions" />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Venue Bookings" />
            <NavItem icon={<User className="w-5 h-5" />} label="Profile Details" />
            <NavItem icon={<CreditCard className="w-5 h-5" />} label="Payment Methods" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="border border-neutral-100 rounded-2xl p-5 hover:border-orange-200 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900">Order #ORD-{1024 + order}</h4>
                        <p className="text-sm text-neutral-500">The Rustic Grill • 3 Items</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="font-bold">Rs. 1,250</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 bg-orange-50 hover:bg-orange-100 p-2 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left
      ${active ? 'bg-orange-50 text-orange-600' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}>
      {icon}
      {label}
    </button>
  );
}
