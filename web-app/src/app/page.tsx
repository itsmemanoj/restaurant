"use client";

import { motion } from "framer-motion";
import { ArrowRight, Utensils, Calendar, Clock} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Utensils className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">FeastHub</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-orange-500 transition-colors">Features</a>
              <a href="#restaurants" className="text-sm font-medium text-neutral-600 hover:text-orange-500 transition-colors">Restaurants</a>
              <a href="#tiffin" className="text-sm font-medium text-neutral-600 hover:text-orange-500 transition-colors">Tiffin Plans</a>
              <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-all shadow-sm hover:shadow-md">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6 leading-tight">
                Your favorite meals, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  delivered fresh.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-10">
                Discover the best local restaurants, subscribe to daily tiffin plans, and book venues for your special events all in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Order Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-neutral-800 px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 border border-neutral-200 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm">
                Explore Tiffins
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-amber-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Everything you need</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">We&apos;ve built a complete ecosystem for food lovers and event planners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Utensils className="w-6 h-6 text-orange-500" />}
              title="Multi-Restaurant Ordering"
              description="Browse menus from hundreds of local restaurants and order with a single tap. Add your favorite drinks or sides easily."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-orange-500" />}
              title="Daily Tiffin Plans"
              description="Living away from home? Subscribe to monthly home-cooked meal plans delivered to your door every single day."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Calendar className="w-6 h-6 text-orange-500" />}
              title="Venue Booking"
              description="Planning a party or marriage? Check real-time availability and book beautiful restaurant venues directly through the app."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Take FeastHub everywhere</h2>
              <p className="text-neutral-400 text-lg mb-8">
                Download our mobile app to order food on the go, track your tiffin deliveries, and manage your account seamlessly. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 transition-colors">
                  <div className="text-left">
                    <div className="text-xs text-neutral-400">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 transition-colors">
                  <div className="text-left">
                    <div className="text-xs text-neutral-400">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-3xl bg-gradient-to-tr from-orange-500/20 to-amber-500/5 border border-white/10 flex items-center justify-center overflow-hidden"
            >
              {/* Abstract Mobile App Representation */}
              <div className="w-64 h-[500px] bg-neutral-900 border-8 border-neutral-800 rounded-[3rem] shadow-2xl relative translate-y-12">
                <div className="absolute top-0 w-full h-6 bg-neutral-800 rounded-t-2xl flex justify-center items-center">
                  <div className="w-16 h-4 bg-neutral-900 rounded-b-xl"></div>
                </div>
                <div className="p-4 pt-10 space-y-4">
                  <div className="h-32 bg-neutral-800 rounded-xl w-full"></div>
                  <div className="h-12 bg-neutral-800 rounded-xl w-3/4"></div>
                  <div className="h-24 bg-neutral-800 rounded-xl w-full"></div>
                  <div className="h-24 bg-neutral-800 rounded-xl w-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <Utensils className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-lg text-neutral-900">FeastHub</span>
          </div>
          <p className="text-neutral-500 text-sm">© 2024 FeastHub Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">Partner with us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 hover:border-orange-200 hover:shadow-lg transition-all group"
    >
      <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
