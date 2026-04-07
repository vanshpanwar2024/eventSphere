"use client";

import { QRCodeSVG } from "qrcode.react";

interface TicketCardProps {
  order: {
    event: {
      title: string;
      date: string;
      location: string;
      image: string;
    };
    ticket: {
      id: string;
      price: string;
      type: string;
    };
  };
}

export default function TicketCard({ order }: TicketCardProps) {
  const { event, ticket } = order;

  // Pass details for QR
  const passData = JSON.stringify({
    passId: ticket.id,
    title: event.title,
    date: event.date,
    location: event.location,
  });

  return (
    <div className="relative w-full bg-[#0a0a0a] border border-[#b49b5c]/30 shadow-[0_0_50px_rgba(180,155,92,0.15)] overflow-hidden flex flex-col md:flex-row">
      {/* Left side Image */}
      <div 
        className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center border-b md:border-b-0 md:border-r border-[#b49b5c]/20"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>

      {/* Right side pass info */}
      <div className="w-full md:w-2/3 p-8 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#b49b5c]/5 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#b49b5c]/5 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="flex-1 space-y-4 relative z-10 w-full">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a] mb-1">Event</p>
            <h3 className="text-xl font-serif text-white">{event.title}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Date</p>
              <p className="text-xs text-[#dcdcdc] mt-1">{event.date}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Venue</p>
              <p className="text-xs text-[#dcdcdc] font-light mt-1">{event.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 mt-4">
             <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Access Type</p>
              <p className="text-xs text-[#b49b5c] uppercase tracking-wider font-bold italic mt-1">{ticket.type}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Price Paid</p>
              <p className="text-xs text-[#dcdcdc] mt-1">{ticket.price}</p>
            </div>
          </div>
          
          {/* Pass ID with Perforation effect */}
          <div className="relative pt-4 mt-6 border-t border-dashed border-white/20 z-10">
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#666] font-mono">
              {ticket.id}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-4 relative z-10 shrink-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8 pt-8 md:pt-0 mt-4 md:mt-0 w-full md:w-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold text-center">Digital Pass</span>
          <div className="p-3 bg-white rounded-xl shadow-[0_0_30px_rgba(180,155,92,0.2)] group transition-all duration-500 hover:scale-[1.02]">
            <QRCodeSVG 
              value={passData} 
              size={120}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "/favicon.ico",
                x: undefined,
                y: undefined,
                height: 16,
                width: 16,
                excavate: true,
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Top accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#b49b5c] to-transparent"></div>
    </div>
  );
}
