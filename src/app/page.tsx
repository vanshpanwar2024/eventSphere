"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThreeBackground from "@/components/ui/ThreeBackground";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { useState } from "react";

const faqs = [
  {
    question: "1. What is Event Sphere?",
    answer: "Event Sphere is an online platform that allows users to discover, book, and manage events gracefully in one place, whether personal or professional."
  },
  {
    question: "2. How do I book an event on Event Sphere?",
    answer: "Simply browse available events, select your preferred option, choose the date and details, and confirm your booking through our secure system."
  },
  {
    question: "3. Can I create and manage my own events?",
    answer: "Yes. Event Sphere allows organizers to create, customize, and manage their events, including ticketing, scheduling, and attendee tracking."
  },
  {
    question: "4. Is Event Sphere suitable for both small and large events?",
    answer: "Absolutely. Our platform is designed to handle everything from small private gatherings to large-scale corporate or public events."
  },
  {
    question: "5. Are payments on Event Sphere secure?",
    answer: "Yes, we use trusted and secure payment gateways to ensure all transactions are safe and reliable."
  },
  {
    question: "6. Can I cancel or modify my booking?",
    answer: "Yes, you can manage, modify, or cancel your bookings depending on the event organizer’s policies."
  },
  {
    question: "7. How can I contact support?",
    answer: "You can reach our support team through the contact section on our website for any assistance or queries."
  }
];

const features = [
  {
    title: "Global Reach",
    description: "Launch your events to a global audience with localized payment options.",
    header: <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#b49b5c]/20 to-black border border-white/5 flex items-center justify-center text-4xl">🌍</div>,
    className: "md:col-span-2",
    icon: <span className="text-[#b49b5c]">✦</span>,
  },
  {
    title: "Smart Insights",
    description: "Analyze attendee behavior with real-time data.",
    header: <div className="h-full w-full rounded-xl bg-gradient-to-br from-black to-[#b49b5c]/10 border border-white/5 flex items-center justify-center text-4xl">📊</div>,
    className: "md:col-span-1",
    icon: <span className="text-[#b49b5c]">✦</span>,
  },
  {
    title: "Secure Payments",
    description: "Multi-layered security for every transaction.",
    header: <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#b49b5c]/5 to-[#b49b5c]/20 border border-white/5 flex items-center justify-center text-4xl">🛡️</div>,
    className: "md:col-span-1",
    icon: <span className="text-[#b49b5c]">✦</span>,
  },
  {
    title: "Premium Support",
    description: "White-glove concierge service for organizers.",
    header: <div className="h-full w-full rounded-xl bg-gradient-to-br from-black to-[#b49b5c]/20 border border-white/5 flex items-center justify-center text-4xl">🥂</div>,
    className: "md:col-span-2",
    icon: <span className="text-[#b49b5c]">✦</span>,
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans selection:bg-[#b49b5c]/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#070707]">
        <ThreeBackground />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 max-w-5xl space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
             <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight drop-shadow-xl text-white">
                Redefine the <br />
                <span className="text-[#b49b5c] italic">Standard of Events</span>
             </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-xl text-[#9b9b9b] font-light max-w-2xl mx-auto drop-shadow px-4"
          >
             Event Sphere is the premier ecosystem for booking, orchestrating, and experiencing world-class gatherings.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-8"
          >
            <Link href="/events" className="group relative inline-block border border-[#b49b5c] text-[#b49b5c] px-12 py-4 rounded-none uppercase tracking-widest text-xs overflow-hidden transition-all duration-500">
              <span className="relative z-10 group-hover:text-[#070707] transition-colors duration-500">Explore Events</span>
              <div className="absolute inset-0 bg-[#b49b5c] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b49b5c]/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      </section>

      {/* Who Are We Section */}
      <section className="relative w-full py-32 px-4 flex flex-col items-center justify-center text-center bg-[#070707] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-4 mb-16"
        >
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.3em] text-[#b49b5c] text-xs font-semibold">
            Our Vision
          </span>
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden">
          <h2 className="text-[20vw] md:text-[15vw] leading-none font-serif tracking-widest text-white/[0.02] whitespace-nowrap opacity-50 md:opacity-100">
            UNPARALLELED
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="z-10 max-w-4xl mx-auto space-y-8 px-4"
        >
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight">
            We Don&apos;t Just Organise Events. <br className="hidden sm:block" />
            <span className="text-[#b49b5c] italic">We Engineer Experiences.</span>
          </h3>

          <p className="pt-8 text-sm md:text-lg text-[#8a8a8a] leading-relaxed max-w-3xl mx-auto font-light">
            Event Sphere is a modern event booking and management platform designed to simplify how people plan, organize, and experience events. We bring together seamless booking, smart management tools, and a user-friendly interface to help individuals and organizations create individuals to memorable experiences with ease. Whether it&apos;s a small gathering or a large-scale event, Event Sphere ensures every detail is handled efficiently, making event planning stress-free and accessible for everyone.
          </p>
        </motion.div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-32 px-6 bg-[#070707] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto mb-20 text-center">
           <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Built for Excellence</h2>
           <p className="text-[#8a8a8a] max-w-xl mx-auto">Discover why EventSphere is the choice of elite organizers worldwide.</p>
        </div>
        <BentoGrid>
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              className={feature.className}
              icon={feature.icon}
            />
          ))}
        </BentoGrid>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-32 px-4 flex flex-col items-center justify-center bg-[#070707] z-10 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center space-x-4 mb-20"
        >
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.3em] text-[#b49b5c] text-xs font-semibold">
            Common Inquiries
          </span>
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
        </motion.div>

        <div className="w-full max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/5 bg-[#0a0a0a]/50 rounded-lg overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-4 md:p-6 flex items-start justify-between group"
              >
                <h4 className="text-base md:text-xl font-serif text-[#dcdcdc] group-hover:text-[#b49b5c] transition-colors duration-300 pr-8">
                  {faq.question}
                </h4>
                <span className={`text-[#b49b5c] transition-transform duration-500 mt-1 shrink-0 ${openFaq === index ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="p-4 md:p-6 pt-0 text-sm md:text-base text-[#8a8a8a] font-light leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}