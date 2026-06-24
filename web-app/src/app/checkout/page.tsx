"use client";

import { motion } from "framer-motion";
import { MapPin, CreditCard, Wallet, ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-orange-500" /> Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-2 border-orange-500 bg-orange-50 rounded-xl p-4 cursor-pointer">
                  <h3 className="font-bold mb-1">Home</h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">123 Bagmati Marg, Baneshwor, Kathmandu, 44600</p>
                </div>
                <div className="border border-neutral-200 hover:border-neutral-300 rounded-xl p-4 cursor-pointer flex items-center justify-center text-neutral-500 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  + Add New Address
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-orange-500" /> Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="w-5 h-5 text-orange-500 focus:ring-orange-500" defaultChecked />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  <Wallet className="w-6 h-6 text-neutral-400" />
                </label>
                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors bg-green-50/50">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="w-5 h-5 text-orange-500 focus:ring-orange-500" />
                    <span className="font-medium text-green-700">eSewa</span>
                  </div>
                  <img src="https://esewa.com.np/common/images/esewa_logo.png" alt="eSewa" className="h-6 object-contain" />
                </label>
                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors bg-purple-50/50">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="w-5 h-5 text-orange-500 focus:ring-orange-500" />
                    <span className="font-medium text-purple-700">Khalti</span>
                  </div>
                  <img src="https://khalti.com/static/images/logo.svg" alt="Khalti" className="h-6 object-contain" />
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">2x Chicken Momo</p>
                    <p className="text-sm text-neutral-500">Extra Spicy</p>
                  </div>
                  <span className="font-medium">Rs. 500</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">1x Margherita Pizza</p>
                  </div>
                  <span className="font-medium">Rs. 650</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>Rs. 1,150</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span>Rs. 100</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-100">
                  <span>Total</span>
                  <span>Rs. 1,250</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                Place Order
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
