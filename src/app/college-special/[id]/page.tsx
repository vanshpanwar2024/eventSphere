import Navbar from "@/components/Navbar";
import { collegeEventsData } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollegeBookingSection from "@/components/CollegeBookingSection";
import { EventRepository } from "@/backend/repositories/EventRepository";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";

const eventRepository = new EventRepository();

export default async function CollegeEventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // 1. Check static data
  let event = collegeEventsData.find((e: any) => e.id.toString() === resolvedParams.id);
  
  // 2. If not found, check hosted repository
  if (!event) {
    const hostedRaw = await eventRepository.findById(Number(resolvedParams.id));
    if (hostedRaw && hostedRaw.isCollegeSpecial) {
      const displayEvent = mapHostedRecordToDisplayEvent(hostedRaw);
      // Map displayEvent fields to event shape (static data has university and type)
      event = {
        ...displayEvent,
        university: displayEvent.location,
        type: displayEvent.category,
      } as any;
    }
  }

  if (!event) {
    return notFound();
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
          <Link href="/college-special" className="text-[#b49b5c] text-xs tracking-widest uppercase mb-6 inline-block hover:text-white transition-colors">
            ← Back to College Special
          </Link>
          <div className="text-xs uppercase tracking-widest text-[#b49b5c] font-semibold mb-4">
            {event.type}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide text-white mb-6">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#8a8a8a] uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="text-[#b49b5c]">🎓</span> {event.university}</span>
            <span className="flex items-center gap-2"><span className="text-[#b49b5c]">🗓</span> {event.date}</span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-16 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl font-serif text-white mb-6">About the College Fest</h2>
            <p className="text-[#8a8a8a] leading-relaxed font-light text-lg">
              {event.description}
            </p>
          </div>
          
          <div className="border-t border-white/5 pt-12">
            <h3 className="text-xl font-serif text-white mb-6">Event Organiser</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#b49b5c]/20 flex items-center justify-center text-[#b49b5c] font-serif text-xl border border-[#b49b5c]/30">
                {event.organizer.charAt(0)}
              </div>
              <span className="text-[#dcdcdc]">{event.organizer}</span>
            </div>
          </div>
        </div>
        
        {/* Booking Card Section (Client Component) */}
        <CollegeBookingSection event={event} />
      </section>
    </main>
  );
}
