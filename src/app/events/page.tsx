"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";
import { eventsData as events } from "@/lib/data";

const FILTERS = ["All", "Tech", "Music", "Food", "Fashion"];

export default function EventsPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState("All");

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleFilterChange = (tag: string) => {
    setActiveFilter(tag);
    setVisibleCount(6); // reset pagination when filter changes
  };

  // Filter events before slicing
  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true;
    return event.category === activeFilter;
  });

  const eventsToDisplay = filteredEvents.slice(0, visibleCount);

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      {/* Header Section */}
      <section className="relative w-full pt-48 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            Discover
          </span>
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif tracking-wide text-white mb-6">
          Curated <span className="text-[#b49b5c] italic">Experiences</span>
        </h1>
        <p className="text-sm md:text-base text-[#8a8a8a] font-light max-w-xl mx-auto">
          Explore our handpicked selection of upcoming events. From global summits to exclusive private galas, find your next extraordinary moment.
        </p>

        {/* Filter Bar */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 text-xs tracking-widest uppercase font-semibold">
          {FILTERS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <button 
                key={tag}
                onClick={() => handleFilterChange(tag)} 
                className={`px-6 py-2 border transition-all duration-300 ${
                  isActive 
                    ? "border-[#b49b5c] text-[#b49b5c] bg-[#b49b5c]/10" 
                    : "border-white/10 text-[#6b6b6b] hover:border-white/30 hover:text-white"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[40vh]">
          {eventsToDisplay.length > 0 ? (
            eventsToDisplay.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div 
                  className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#b49b5c]/30 hover:shadow-[0_10px_40px_rgba(180,155,92,0.05)] cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/90"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[#dcdcdc]">
                      {event.category}
                    </div>
                  </div>

                  {/* Dynamic Content Details */}
                  <div className="flex flex-col flex-1 p-6 z-10 -mt-12">
                    <div className="text-xs uppercase tracking-widest text-[#b49b5c] mb-2 font-semibold">
                      {event.date}
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-4 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-sm text-[#8a8a8a] border-t border-white/5 pt-4">
                      <span className="flex items-center gap-2">
                        <span className="text-[#b49b5c]">📍</span> {event.location}
                      </span>
                      <span className="font-serif text-white text-lg">
                        {event.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center text-[#8a8a8a] py-24 space-y-4">
              <span className="text-4xl">📭</span>
              <p className="text-lg font-serif">No events found for this category yet.</p>
            </div>
          )}
        </div>
        
        {/* Load More Button */}
        {visibleCount < filteredEvents.length && (
          <div className="mt-24 flex justify-center">
             <button 
               onClick={loadMore}
               className="border border-white/20 text-[#dcdcdc] px-10 py-3 rounded-none uppercase tracking-widest text-sm hover:border-[#b49b5c] hover:text-[#b49b5c] hover:bg-[#b49b5c]/5 transition-all duration-300"
             >
               Load More Events
             </button>
          </div>
        )}
      </section>

    </main>
  );
}
