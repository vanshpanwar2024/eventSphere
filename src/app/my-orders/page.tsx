"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/ui/TicketCard";
import { Order, orderService } from "@/services/orderService";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#070707] text-[#dcdcdc] font-sans">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-40 pb-16 px-6 md:px-16 lg:px-32 bg-gradient-to-b from-[#0a0a0a] to-[#070707] relative border-b border-white/5">
        <div className="absolute inset-0 bg-[#b49b5c]/5 bg-opacity-20 pointer-events-none mix-blend-screen" 
             style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(180, 155, 92, 0.08), transparent 30%)' }}>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold mb-4">
            Personal Dashboard
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-white drop-shadow-2xl">
            My <span className="italic font-light">Orders</span>
          </h1>
        </div>
      </section>

      {/* Orders List Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-2 border-[#b49b5c] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="border border-[#b49b5c] text-[#b49b5c] px-6 py-2 uppercase tracking-widest text-[10px] hover:bg-[#b49b5c] hover:text-black transition-colors"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 bg-[#0a0a0a]">
            <p className="text-xl font-serif text-[#8a8a8a] mb-6">You haven't reserved any passes yet.</p>
            <Link 
              href="/events"
              className="border border-[#b49b5c] text-[#b49b5c] px-8 py-3 uppercase tracking-[0.2em] text-[10px] hover:bg-[#b49b5c] hover:text-black transition-all"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, idx) => (
              <motion.div 
                key={order.ticket.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TicketCard order={order} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
