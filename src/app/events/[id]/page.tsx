import Navbar from "@/components/Navbar";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent, type DisplayEvent } from "@/lib/hosted-event-display";
import { EventRepository } from "@/backend/repositories/EventRepository";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSection from "@/components/BookingSection";

const eventRepository = new EventRepository();

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
    });
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
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 lg:px-32 pb-24 z-10">
          <Link href="/events" className="group text-[#b49b5c] text-[10px] tracking-[0.3em] uppercase mb-8 inline-flex items-center gap-2 hover:text-white transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Collection
          </Link>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold mb-6">
             {event.category}
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white mb-8 leading-tight drop-shadow-2xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-10 text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] font-semibold">
            <span className="flex items-center gap-3"><span className="text-[#b49b5c] text-lg">📍</span> {event.location}</span>
            <span className="flex items-center gap-3"><span className="text-[#b49b5c] text-lg">🗓</span> {event.date}</span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-24 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="md:col-span-2 space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-white italic border-l-2 border-[#b49b5c] pl-6 py-2">The Experience</h2>
            <p className="text-[#8a8a8a] leading-relaxed font-light text-lg">
              {event.description}
            </p>
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
