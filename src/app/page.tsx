"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import EventSphere3D from "@/components/EventSphere3D";
import { useState } from "react";

const faqs = [
  {
    question: "What exactly is Event Sphere?",
    answer: "Event Sphere is a superlative digital platform enabling you to orchestrate, discover, and manage premium events seamlessly, uniting creators and attendees in one synchronized ecosystem."
  },
  {
    question: "How do I secure my passes?",
    answer: "Browse our curated collection, engage with our immersive portals, and secure your digital passes instantly through our encrypted, latency-free verification system."
  },
  {
    question: "Can organizations host exclusive mega-events?",
    answer: "Absolutely. Our infrastructure guarantees flawless execution—from private underground summits to 100,000+ stadium tours. Event Sphere scales linearly without friction."
  },
  {
    question: "What makes your ticketing different?",
    answer: "We utilize dynamic blockchain-secured credentials. This prevents scalping, duplicates, and fraud while maintaining an effortless 1-click checkout experience for users."
  },
  {
    question: "Is there support for enterprise organizers?",
    answer: "Enterprise curators get access to dedicated account managers, precise real-time analytics, dynamic heatmaps, and white-glove onboarding."
  }
];

const easeOutCirc: [number, number, number, number] = [0.075, 0.82, 0.165, 1];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#dcdcdc] font-sans selection:bg-[#b49b5c] selection:text-[#050505] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <EventSphere3D />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 flex flex-col items-center w-full max-w-6xl"
        >
          {/* Subtle Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: easeOutCirc }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full mb-10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b49b5c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b49b5c]"></span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#a0a0a0] font-medium">Entering Version 2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: easeOutCirc }}
            className="text-[12vw] sm:text-7xl md:text-8xl xl:text-9xl font-serif text-white tracking-tighter leading-[0.85] pb-2"
          >
            Orchestrate<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b49b5c] via-[#e2d5ab] to-[#8c7845] drop-shadow-lg pr-4">
              The Extraordinary.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: easeOutCirc }}
            className="mt-10 text-base md:text-xl text-[#8a8a8a] font-light max-w-2xl text-center leading-relaxed px-4"
          >
            The world's most advanced architecture for discovering, curating, and executing premium experiences. Engineered for absolute perfection.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: easeOutCirc }}
            className="mt-14 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link 
              href="/events" 
              className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-semibold tracking-wide hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(180,155,92,0.4)]"
            >
              Explore Events
            </Link>
            <Link 
              href="/college-special" 
              className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold tracking-wide border border-white/10 text-white hover:bg-white/5 transition-colors duration-500"
            >
              Student Portal
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Box Features Section */}
      <section className="relative w-full py-40 px-6 z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: easeOutCirc }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">Built for Scale.<br/>Designed for Impact.</h2>
            <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto font-light">We've brutally reimagined the event lifecycle, providing deep analytics, flawless high-density ticketing, and sheer aesthetic superiority.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard 
              title="Global Infrastructure" 
              description="Our architecture is deployed across edge networks globally. It guarantees sub-10ms latency for bookings, live updates, and analytics no matter where your attendees are."
              className="md:col-span-2 min-h-[400px] flex justify-end"
              badge="Edge Protocol"
            />
            <BentoCard 
              title="Sensory Heatmaps" 
              description="Watch ticket sales and attendee check-ins unfold dynamically in beautiful, real-time graphical interfaces."
              className="md:col-span-1 min-h-[400px]"
              badge="Analytics"
            />
            <BentoCard 
              title="Military-Grade Security" 
              description="Every transaction is entirely encrypted, verified, and locked."
              className="md:col-span-1 min-h-[300px]"
              badge="Encrypted"
            />
            <BentoCard 
              title="Complete Creative Autonomy" 
              description="From VIP seating matrices to bespoke visual ticketing—you own the entire aesthetic of your event."
              className="md:col-span-2 min-h-[300px]"
              badge="Customization"
            />
          </div>
        </div>
      </section>

      {/* Aesthetic Spacer */}
      <div className="w-full h-32 bg-gradient-to-b from-[#050505] to-[#0a0a0a]"></div>

      {/* Premium FAQ Section */}
      <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center bg-[#0a0a0a] z-10 border-t border-white/[0.03]">
        <div className="w-full max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: easeOutCirc }}
            className="flex flex-col mb-16"
          >
            <span className="text-[#b49b5c] uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Support Base</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Frequently Asked<br/>Questions</h2>
          </motion.div>

          <div className="flex flex-col border-t border-white/[0.08]">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full pt-32 pb-16 bg-[#020202] text-center flex flex-col items-center">
        <h2 className="text-7xl md:text-[150px] font-serif tracking-tighter text-white/[0.03] select-none pointer-events-none absolute -mt-20">EVENT SPHERE</h2>
        <div className="z-10 relative">
          <div className="text-white font-serif text-3xl mb-8 tracking-wider">Event Sphere.</div>
          <div className="flex space-x-8 mb-16 text-xs uppercase tracking-widest text-[#6b6b6b]">
            <Link href="#" className="hover:text-white transition-colors duration-300">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Contact</Link>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#333]">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// Subcomponents

function BentoCard({ title, description, className, badge }: { title: string, description: string, className?: string, badge: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: easeOutCirc }}
      className={`group relative overflow-hidden bg-white/[0.015] border border-white/[0.04] rounded-3xl p-8 md:p-12 hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-700 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#b49b5c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="mb-auto inline-flex items-center">
          <span className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] backdrop-blur-md">
            {badge}
          </span>
        </div>
        <div className="mt-8 transition-transform duration-700 group-hover:translate-x-2">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 tracking-tight">{title}</h3>
          <p className="text-[#8a8a8a] font-light leading-relaxed max-w-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: easeOutCirc }}
      className="border-b border-white/[0.08] overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left py-8 flex justify-between items-center group focus:outline-none"
      >
        <h4 className="text-lg md:text-2xl font-serif text-[#dcdcdc] group-hover:text-white transition-colors duration-300">
          {question}
        </h4>
        <span className={`text-[#b49b5c] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOutCirc }}
          >
            <p className="pb-10 pt-2 text-[#8a8a8a] text-lg font-light leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}