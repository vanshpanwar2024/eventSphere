import Navbar from "@/components/Navbar";

const faqs = [
  {
    question: "1. What is Event Sphere?",
    answer: "Event Sphere is an online platform that allows users to discover, book, and manage events بسهولة in one place, whether personal or professional."
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

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans">
      {/* Absolute positioned, transparent Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#070707]">
        <div className="z-10 max-w-5xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md pb-4">
            Experience Events Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-[#9b9b9b] font-light max-w-2xl mx-auto drop-shadow">
            Event Sphere makes booking, managing, and discovering events effortless. 
          </p>
          <div className="pt-12">
            <button className="border border-[#b49b5c] text-[#b49b5c] px-10 py-3 rounded-none uppercase tracking-widest text-sm hover:bg-[#b49b5c] hover:text-[#070707] transition-all duration-300">
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
      <section className="relative w-full py-32 px-4 flex flex-col items-center justify-center text-center bg-[#070707] overflow-hidden">
        {/* Overline heading */}
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            Who We Are
          </span>
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
        </div>

        <div className="z-10 max-w-4xl mx-auto space-y-6">
          {/* Main Statement */}
          <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            We Don't Just Organise Events. <br />
            <span className="text-[#b49b5c] italic">We Engineer Experiences.</span>
          </h3>

          {/* User's Text Paragraph */}
          <p className="pt-8 text-sm md:text-base text-[#8a8a8a] leading-relaxed max-w-3xl mx-auto font-light">
            Event Sphere is a modern event booking and management platform designed to simplify how people plan, organize, and experience events. We bring together seamless booking, smart management tools, and a user-friendly interface to help individuals and organizations create memorable experiences with ease. Whether it's a small gathering or a large-scale event, Event Sphere ensures every detail is handled efficiently, making event planning stress-free and accessible for everyone.
          </p>
        </div>

        <div className="mt-24 uppercase tracking-[0.2em] text-[#6b6b6b] text-xs">
          Scroll
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-32 px-4 flex flex-col items-center justify-center bg-[#070707] z-10 border-t border-white/5">
        {/* Overline heading */}
        <div className="flex items-center space-x-4 mb-16">
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            FAQs
          </span>
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
        </div>

        <div className="w-full max-w-6xl md:columns-2 gap-x-16">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group border-b border-white/10 pb-6 pt-6 mb-4 cursor-pointer transition-all duration-300 break-inside-avoid"
            >
              <h4 className="text-xl md:text-2xl font-serif text-[#dcdcdc] group-hover:text-[#b49b5c] transition-colors duration-300">
                {faq.question}
              </h4>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                <div className="overflow-hidden">
                  <p className="pt-4 text-sm md:text-base text-[#8a8a8a] font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}