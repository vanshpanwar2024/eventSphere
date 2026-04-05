import Navbar from "@/components/Navbar";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent, type DisplayEvent } from "@/lib/hosted-event-display";
import { EventRepository } from "@/backend/repositories/EventRepository";
import Link from "next/link";
import { notFound } from "next/navigation";

const eventRepository = new EventRepository();

export const dynamic = "force-dynamic";

// Required for Next.js app router dynamic params
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
      <section className="relative w-full h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 lg:px-32 pb-16 z-10">
          <Link href="/events" className="text-[#b49b5c] text-xs tracking-widest uppercase mb-6 inline-block hover:text-white transition-colors">
            ← Back to Events
          </Link>
          <div className="text-xs uppercase tracking-widest text-[#b49b5c] font-semibold mb-4">
            {event.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide text-white mb-6">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#8a8a8a] uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="text-[#b49b5c]">📍</span> {event.location}</span>
            <span className="flex items-center gap-2"><span className="text-[#b49b5c]">🗓</span> {event.date}</span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-16 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl font-serif text-white mb-6">About the Event</h2>
            <p className="text-[#8a8a8a] leading-relaxed font-light text-lg">
              {event.description}
            </p>
          </div>
          
          <div className="border-t border-white/5 pt-12">
            <h3 className="text-xl font-serif text-white mb-6">Event Organiser</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#b49b5c]/20 flex items-center justify-center text-[#b49b5c] font-serif text-xl">
                {event.organizer.charAt(0)}
              </div>
              <span className="text-[#dcdcdc]">{event.organizer}</span>
            </div>
          </div>
        </div>
        
        {/* Booking Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col h-fit sticky top-32">
          <h3 className="text-2xl font-serif text-white mb-2">Reserve Your Pass</h3>
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-8">Limited Availability</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-sm text-[#8a8a8a]">Date</span>
              <span className="text-[#dcdcdc] text-sm text-right">{event.date}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-sm text-[#8a8a8a]">Time</span>
              <span className="text-[#dcdcdc] text-sm text-right">{event.time}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-sm text-[#8a8a8a]">Amount</span>
              <span className="text-2xl font-serif text-[#b49b5c]">{event.price}</span>
            </div>
          </div>
          
          <button className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-[#070707] transition-all duration-300">
            Proceed to Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
