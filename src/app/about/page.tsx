import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="z-10 max-w-4xl space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
            <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
              Our Origin
            </span>
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md text-white">
            Redefining How <br />
            <span className="text-[#b49b5c] italic">People Connect</span>
          </h1>
          <p className="pt-8 text-sm md:text-base text-[#8a8a8a] leading-relaxed max-w-2xl mx-auto font-light">
            Founded with a vision to eliminate the friction in event planning, 
            Event Sphere is an elite platform for curating, discovering, and experiencing world-class events. 
            We blend cutting-edge technology with sophisticated design to deliver an unparalleled experience.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative w-full py-24 px-4 flex flex-col md:flex-row items-center justify-center gap-16 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Our Philosophy
          </h2>
          <p className="text-sm md:text-base text-[#8a8a8a] leading-relaxed font-light">
            We believe that every event is a story waiting to be told. From intimate private gatherings to extensive corporate galas, the magic lies in the details. Event Sphere acts as the silent architect behind the scenes, ensuring that organizers can focus on their vision while our technology handles the logistics flawlessly.
          </p>
          <div className="pt-4">
            <ul className="space-y-4 font-serif text-[#dcdcdc] text-xl">
              <li className="flex items-center space-x-4">
                <span className="text-[#b49b5c] text-2xl">✦</span>
                <span>Uncompromised Aesthetics</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="text-[#b49b5c] text-2xl">✦</span>
                <span>Flawless Execution</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="text-[#b49b5c] text-2xl">✦</span>
                <span>Innovative Technology</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative Graphic */}
        <div className="flex-1 relative w-full aspect-[4/5] md:aspect-square bg-[#0a0a0a] border border-white/5 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#b49b5c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="w-3/4 h-3/4 border border-[#b49b5c]/30 rounded-full flex flex-col items-center justify-center p-8 text-center rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-out">
            <h3 className="font-serif text-3xl text-white mb-2 italic">Crafting Memories.</h3>
            <p className="text-xs tracking-widest uppercase text-[#6b6b6b]">Since 2024</p>
          </div>
        </div>
      </section>

    </main>
  );
}
