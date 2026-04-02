import Navbar from "@/components/Navbar";
import Link from "next/link";
import { collegeEventsData as collegeEvents } from "@/lib/data";

export default function CollegeSpecialPage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#b49b5c] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

        <div className="z-10 max-w-4xl space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
            <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
              Student Exclusive
            </span>
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md text-white">
            Premier <span className="text-[#b49b5c] italic">College</span> Events
          </h1>
          
          <p className="pt-6 text-sm md:text-base text-[#8a8a8a] leading-relaxed max-w-2xl mx-auto font-light">
            Step into the next generation of experiences. 
            From cutting-edge tech symposiums to the most anticipated cultural nights 
            at India's elite institutions. Specially curated, priced for students.
          </p>
        </div>
      </section>

      {/* Verified Student Banner (Aesthetic Touch) */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#b49b5c]/5 border border-[#b49b5c]/20 rounded-sm p-8">
          <div className="mb-6 md:mb-0 space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl text-white">Verify Your Student ID</h3>
            <p className="text-[#8a8a8a] text-sm">Unlock up to 40% exclusive student discounts across all premium events.</p>
          </div>
          <button className="border border-[#b49b5c] text-[#070707] bg-[#b49b5c] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-transparent hover:text-[#b49b5c] transition-all duration-300">
            Verify Now
          </button>
        </div>
      </section>

      {/* College Events Grid */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {collegeEvents.map((event) => (
            <Link href={`/college-special/${event.id}`} key={event.id}>
              <div 
                className="group relative flex flex-col h-full bg-transparent border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#b49b5c]/40 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-[#b49b5c] text-[#070707] px-3 py-1 font-bold text-[9px] uppercase tracking-widest">
                    {event.type}
                  </div>
                </div>

                {/* Dynamic Content Details */}
                <div className="flex flex-col flex-1 p-6 z-10 -mt-16">
                  <h3 className="text-2xl font-serif text-white mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="text-xs tracking-widest uppercase text-[#8a8a8a] mb-6 font-semibold line-clamp-1">
                    {event.university}
                  </div>

                  <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#6b6b6b]">Date</span>
                      <span className="text-sm text-[#dcdcdc]">{event.date}</span>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#b49b5c]">Student Pass</span>
                      <span className="font-serif text-[#b49b5c] text-xl">
                        {event.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ambassador Application Section */}
      <section className="relative w-full py-32 px-4 mt-20 flex flex-col items-center justify-center text-center bg-[#0a0a0a] border-t border-white/5">
        <div className="z-10 max-w-3xl space-y-6">
          <h2 className="text-4xl font-serif text-white">
            Want to Host <span className="text-[#b49b5c] italic">Event Sphere</span> at Your Campus?
          </h2>
          <p className="text-sm text-[#8a8a8a] leading-relaxed font-light pb-6">
            Become a Campus Ambassador. Bring elite networking, state-of-the-art tech, and exclusive acts directly to your college festival. Lead the movement.
          </p>
          <button className="border border-white/20 text-[#dcdcdc] px-10 py-3 rounded-none uppercase tracking-widest text-sm hover:border-[#b49b5c] hover:text-[#b49b5c] transition-all duration-300">
            Apply for Campus Ambassador
          </button>
        </div>
      </section>

    </main>
  );
}
