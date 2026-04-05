import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pt-32 pb-32">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Overline heading */}
        <div className="flex items-center space-x-4 mb-12 justify-center">
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            Event Sphere
          </span>
          <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-center tracking-wide mb-16 text-white">
          About Us
        </h1>

        <div className="space-y-8 text-sm md:text-base text-[#8a8a8a] leading-relaxed font-light">
          <p>
            At <strong className="font-semibold text-[#dcdcdc]">Event Sphere</strong>, we believe that every event tells a story—and we’re here to help you create it effortlessly. Event Sphere is a comprehensive event booking and management platform designed to bring simplicity, efficiency, and innovation to the way events are planned and experienced. Whether you are an individual organizing a personal celebration or a professional managing large-scale events, our platform empowers you with the tools you need to succeed.
          </p>

          <p>
            Our mission is to eliminate the complexity of event planning by providing a seamless, all-in-one solution. From discovering events and booking tickets to organizing, promoting, and managing them, Event Sphere connects users and organizers on a single, intuitive platform. We focus on delivering a smooth user experience, ensuring that every step—from planning to execution—is efficient and stress-free.
          </p>

          <p>
            We understand that no two events are the same. That’s why Event Sphere is built with flexibility and scalability in mind. Whether it’s a birthday party, wedding, college fest, corporate seminar, or public event, our platform adapts to your needs. Organizers can easily manage registrations, track attendees, and handle event logistics, while users can explore and book events that match their interests.
          </p>

          <p>
            At the core of Event Sphere lies a commitment to reliability and trust. We prioritize secure transactions, transparent processes, and responsive support to ensure that both organizers and attendees feel confident using our platform. Our goal is not just to simplify event management, but to enhance the overall event experience for everyone involved.
          </p>

          <p>
            As we continue to grow, we aim to build a community where people can connect, celebrate, and create unforgettable moments. <span className="italic text-[#b49b5c]">Event Sphere is more than just a platform—it’s your partner in turning ideas into successful events.</span>
          </p>
        </div>
      </section>
    </main>
  );
}
