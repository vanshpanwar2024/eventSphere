"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminPortal() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use a simple built-in secret for now. 
    // Usually, you should use NextAuth role-based auth or signed cookies.
    if (secretKey === "admin123") {
      setIsAdminAuth(true);
      fetchEvents();
    } else {
      setAuthError("Invalid Secret Key");
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number | string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/events/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAdminAuth) {
    return (
      <main className="min-h-screen bg-[#070707] flex flex-col items-center justify-center p-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl text-white font-serif mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Enter Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#b49b5c]"
            />
            {authError && <p className="text-red-500 text-xs">{authError}</p>}
            <button type="submit" className="w-full bg-[#b49b5c] text-black py-2 uppercase tracking-widest text-xs">
              Authenticate
            </button>
          </form>
        </div>
      </main>
    );
  }

  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = events.filter((ev) => {
    const matchSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase()) || ev.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "All" || ev.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      <section className="pt-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">
          Submissions <span className="text-[#b49b5c]">Control Center</span>
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#0a0a0a] border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-[#b49b5c]"
          />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0a0a0a] border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-[#b49b5c] [&>option]:bg-[#0a0a0a]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-[#8a8a8a] py-16">Loading database records...</div>
        ) : (
          <div className="overflow-x-auto border border-white/5 bg-[#0a0a0a]">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-[#8a8a8a]">No events found matching your filters.</div>
            ) : (
              <table className="w-full text-left text-sm text-[#8a8a8a]">
                <thead className="text-xs uppercase bg-white/5 border-b border-white/10 text-white">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((ev) => (
                    <tr key={ev.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-medium text-white">{ev.title}</td>
                      <td className="px-6 py-4">{ev.category}</td>
                      <td className="px-6 py-4">{new Date(ev.dateTime).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs uppercase tracking-widest ${
                          ev.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                          ev.status === 'declined' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {ev.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 min-w-[250px]">
                        <button 
                          onClick={() => setSelectedEvent(ev)}
                          className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 px-3 py-1 rounded text-xs uppercase transition"
                        >
                          View
                        </button>
                        {ev.status !== 'approved' && (
                          <button 
                            onClick={() => handleUpdateStatus(ev.id, 'approved')}
                            className="bg-green-600/20 text-green-400 hover:bg-green-600/40 px-3 py-1 rounded text-xs uppercase transition"
                          >
                            Approve
                          </button>
                        )}
                        {ev.status !== 'declined' && (
                          <button 
                            onClick={() => handleUpdateStatus(ev.id, 'declined')}
                            className="bg-red-600/20 text-red-500 hover:bg-red-600/40 px-3 py-1 rounded text-xs uppercase transition"
                          >
                            Decline
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[#8a8a8a] hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-serif text-white">{selectedEvent.title}</h2>
                  <span className={`px-2 py-1 rounded text-xs uppercase tracking-widest ${
                    selectedEvent.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    selectedEvent.status === 'declined' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {selectedEvent.status || 'pending'}
                  </span>
                </div>
                <p className="text-sm text-[#b49b5c] uppercase tracking-widest">{selectedEvent.category} {selectedEvent.isCollegeSpecial ? "• College Special" : ""}</p>
              </div>

              {selectedEvent.thumbnailUrl && (
                <div className="w-full h-64 bg-[#111] overflow-hidden flex items-center justify-center border border-white/5">
                  <img src={selectedEvent.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-1">Date & Time</h3>
                  <p className="text-white">{new Date(selectedEvent.dateTime).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-1">Location</h3>
                  <p className="text-white">{selectedEvent.location}</p>
                </div>
                <div>
                  <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-1">Participants</h3>
                  <p className="text-white">Max: {selectedEvent.maxParticipants}</p>
                </div>
                <div>
                  <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-1">Pricing</h3>
                  <p className="text-white">{selectedEvent.isPaid ? `Paid • ₹${selectedEvent.ticketPrice}` : 'Free'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-2">Description</h3>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{selectedEvent.description}</p>
              </div>

              {selectedEvent.brochureUrl && (
                <div>
                  <h3 className="text-[#8a8a8a] uppercase tracking-widest text-xs mb-2">G-Drive Brochure</h3>
                  <a href={selectedEvent.brochureUrl} target="_blank" rel="noopener noreferrer" className="text-[#b49b5c] hover:underline underline-offset-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    View Document
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 bg-[#111] border-t border-white/5 flex items-center justify-end gap-4 min-w-[250px]">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 text-xs uppercase tracking-widest text-[#8a8a8a] hover:text-white transition"
              >
                Close
              </button>
              {selectedEvent.status !== 'declined' && (
                <button 
                  onClick={() => {
                    handleUpdateStatus(selectedEvent.id, 'declined');
                    setSelectedEvent({ ...selectedEvent, status: 'declined' });
                  }}
                  className="bg-red-600/20 text-red-500 hover:bg-red-600/40 px-6 py-2 rounded text-xs uppercase transition border border-red-500/20"
                >
                  Decline
                </button>
              )}
              {selectedEvent.status !== 'approved' && (
                <button 
                  onClick={() => {
                    handleUpdateStatus(selectedEvent.id, 'approved');
                    setSelectedEvent({ ...selectedEvent, status: 'approved' });
                  }}
                  className="bg-green-600/20 text-green-400 hover:bg-green-600/40 px-6 py-2 rounded text-xs uppercase transition border border-green-500/20"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}