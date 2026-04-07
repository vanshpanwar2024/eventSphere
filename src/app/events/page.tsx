"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { DisplayEvent } from "@/lib/hosted-event-display";

const FILTERS = ["All", "Tech", "Music", "Food", "Fashion"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function EventsPage() {
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let cancelled = false;
    setFetchError(null);
    fetch("/api/events", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data: DisplayEvent[]) => {
        if (!cancelled) setEvents(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setFetchError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleFilterChange = (tag: string) => {
    setActiveFilter(tag);
    setVisibleCount(6); // reset pagination when filter changes
  };

  const filteredEvents = events.filter((event) => {
    if (event.isCollegeSpecial) return false;
    if (activeFilter === "All") return true;
    return event.category === activeFilter;
  });

  const eventsToDisplay = filteredEvents.slice(0, visibleCount);

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      {/* Header Section */}
      <section className="relative w-full pt-48 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4 mb-6"
        >
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            Discover
          </span>
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-serif tracking-wide text-white mb-6"
        >
          Curated <span className="text-[#b49b5c] italic">Experiences</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-base text-[#8a8a8a] font-light max-w-xl mx-auto"
        >
          Explore our handpicked selection of upcoming events. From global summits to exclusive private galas, find your next extraordinary moment.
        </motion.p>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4 text-xs tracking-widest uppercase font-semibold"
        >
          {FILTERS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <button 
                key={tag}
                onClick={() => handleFilterChange(tag)} 
                className={`px-6 py-2 border relative transition-all duration-300 ${
                  isActive 
                    ? "border-[#b49b5c] text-[#b49b5c]" 
                    : "border-white/10 text-[#6b6b6b] hover:border-white/30 hover:text-white"
                }`}
              >
                {tag}
                {isActive && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[#b49b5c]/10 z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>
      </section>

      {/* Events Grid Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12">
        {fetchError && (
          <div className="mb-8 p-4 border border-red-500/50 bg-red-500/10 text-red-200 text-sm text-center">
            {fetchError}
          </div>
        )}
        
        {loading && (
          <div className="flex flex-col items-center justify-center text-center text-[#8a8a8a] py-24 space-y-4">
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="text-4xl"
            >
              ✦
            </motion.span>
            <p className="text-lg font-serif">Loading events…</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[40vh]"
          >
            {eventsToDisplay.map((event) => (
              <motion.div key={event.id} variants={item} layout>
                <Link href={`/events/${event.id}`}>
                  <div 
                    className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#b49b5c]/50 hover:shadow-[0_10px_40px_rgba(180,155,92,0.1)] cursor-pointer"
                  >
                    <div className="relative w-full h-72 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/90"></div>
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[#dcdcdc]">
                        {event.category}
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-8 z-10 -mt-16">
                      <div className="text-xs uppercase tracking-widest text-[#b49b5c] mb-3 font-semibold">
                        {event.date}
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-6 line-clamp-2 leading-snug group-hover:text-[#b49b5c] transition-colors">
                        {event.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between text-sm text-[#8a8a8a] border-t border-white/5 pt-6">
                        <span className="flex items-center gap-2">
                          <span className="text-[#b49b5c] text-lg">📍</span> {event.location}
                        </span>
                        <span className="font-serif text-white text-xl">
                          {event.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {!loading && eventsToDisplay.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center text-[#8a8a8a] py-24 space-y-4">
            <span className="text-4xl opacity-20">📭</span>
            <p className="text-lg font-serif">No events found for this category yet.</p>
          </div>
        )}
        
        {/* Load More Button */}
        {visibleCount < filteredEvents.length && (
          <div className="mt-24 flex justify-center">
             <button 
               onClick={loadMore}
               className="group relative border border-white/20 text-[#dcdcdc] px-12 py-4 rounded-none uppercase tracking-widest text-xs overflow-hidden transition-all duration-300"
             >
               <span className="relative z-10 group-hover:text-[#070707]">Load More Experiences</span>
               <div className="absolute inset-0 bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
             </button>
          </div>
        )}
      </section>
    </main>
  );
}
