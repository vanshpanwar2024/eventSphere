import Navbar from "@/components/Navbar";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent, type DisplayEvent } from "@/lib/hosted-event-display";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSection from "@/components/BookingSection";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const idStr = resolvedParams.id;
  const numericId = Number(idStr);

  const staticEvent = eventsData.find((e) => e.id.toString() === idStr);

  let event: DisplayEvent | (typeof eventsData)[number];

  if (staticEvent) {
    event = staticEvent;
  } else if (!Number.isFinite(numericId)) {
    return notFound();
  } else {
    // Dynamically import repository to avoid Supabase crash at module evaluation
    try {
      const { EventRepository } = await import("@/backend/repositories/EventRepository");
      const eventRepository = new EventRepository();
      const hosted = await eventRepository.findById(numericId);
      if (!hosted) {
        return notFound();
      }
      event = mapHostedRecordToDisplayEvent({
        id: hosted.id,
        title: hosted.title,
        description: hosted.description,
        dateTime: hosted.dateTime,
        location: hosted.location,
        category: hosted.category,
        maxParticipants: hosted.maxParticipants,
        isPaid: hosted.isPaid,
        ticketPrice: hosted.ticketPrice,
        isCollegeSpecial: hosted.isCollegeSpecial,
        brochureUrl: hosted.brochureUrl,
        thumbnailUrl: hosted.thumbnailUrl,
      });
    } catch (err) {
      console.warn("Could not fetch hosted event from database:", err);
      return notFound();
    }
  }

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />
      
      {/* Hero Image Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-16 lg:px-32 pb-12 md:pb-24 z-10">
          <Link href="/events" className="group text-[#b49b5c] text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-6 md:mb-8 inline-flex items-center gap-2 hover:text-white transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Collection
          </Link>
          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold mb-4 md:mb-6">
             {event.category}
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl px-2 md:px-0">
            {event.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-[9px] md:text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] font-semibold">
            <span className="flex items-center gap-3"><span className="text-[#b49b5c] text-base md:text-lg">📍</span> {event.location}</span>
            <span className="flex items-center gap-3"><span className="text-[#b49b5c] text-base md:text-lg">🗓</span> {event.date}</span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 lg:px-32 pt-12 md:pt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
        <div className="md:col-span-2 space-y-12 md:space-y-16">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-white italic border-l-2 border-[#b49b5c] pl-6 py-2">The Experience</h2>
            <p className="text-[#8a8a8a] leading-relaxed font-light text-base md:text-lg whitespace-pre-wrap">
              {event.description}
            </p>
            {/* Optional Brochure Download/View link */}
            {(event as any).brochureUrl && (
              <div className="pt-4">
                <a 
                  href={(event as any).brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[#b49b5c] text-[#b49b5c] hover:bg-[#b49b5c] hover:text-[#070707] transition-colors text-xs uppercase tracking-widest font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  View Event Brochure
                </a>
              </div>
            )}
          </div>
          
          <div className="border-t border-white/5 pt-16 group">
            <h3 className="text-xl font-serif text-white mb-8 group-hover:text-[#b49b5c] transition-colors uppercase tracking-widest">Host / Curators</h3>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#b49b5c]/10 border border-[#b49b5c]/30 flex items-center justify-center text-[#b49b5c] font-serif text-2xl group-hover:bg-[#b49b5c]/20 transition-all">
                {event.organizer.charAt(0)}
              </div>
              <div className="space-y-1">
                 <span className="block text-[#dcdcdc] text-lg font-serif">{event.organizer}</span>
                 <span className="block text-[9px] uppercase tracking-[0.3em] text-[#b49b5c]">Official Organizer</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Card Section (Client Component) */}
        <BookingSection event={event} />
      </section>
    </main>
  );
}
