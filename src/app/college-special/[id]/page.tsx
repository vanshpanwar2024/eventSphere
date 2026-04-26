import Navbar from "@/components/Navbar";
import { collegeEventsData } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollegeBookingSection from "@/components/CollegeBookingSection";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";

export default async function CollegeEventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // 1. Check static data
  let event = collegeEventsData.find((e: any) => e.id.toString() === resolvedParams.id);
  
  // 2. If not found, check hosted repository
  if (!event) {
    try {
      const { EventRepository } = await import("@/backend/repositories/EventRepository");
      const eventRepository = new EventRepository();
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
    } catch (err) {
      console.warn("Could not fetch hosted college event from database:", err);
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
        
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-16 lg:px-32 pb-12 md:pb-16 z-10">
          <Link href="/college-special" className="group text-[#b49b5c] text-[9px] md:text-xs tracking-widest uppercase mb-4 md:mb-6 inline-flex items-center gap-2 hover:text-white transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to College Special
          </Link>
          <div className="text-[9px] md:text-xs uppercase tracking-widest text-[#b49b5c] font-semibold mb-3 md:mb-4">
            {event.type}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-wide text-white mb-6 leading-tight drop-shadow-2xl">
            {event.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-[10px] md:text-sm text-[#8a8a8a] uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="text-[#b49b5c] text-base">🎓</span> {event.university}</span>
            <span className="flex items-center gap-2"><span className="text-[#b49b5c] text-base">🗓</span> {event.date}</span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 lg:px-32 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">About the College Fest</h2>
            <p className="text-[#8a8a8a] leading-relaxed font-light text-base md:text-lg whitespace-pre-wrap">
              {event.description}
            </p>
            {/* Optional Brochure Download/View link */}
            {(event as any).brochureUrl && (
              <div className="pt-6">
                <a 
                  href={(event as any).brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[#b49b5c] text-[#b49b5c] hover:bg-[#b49b5c] hover:text-[#070707] transition-colors text-xs uppercase tracking-widest font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  View Fest Brochure
                </a>
              </div>
            )}
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
