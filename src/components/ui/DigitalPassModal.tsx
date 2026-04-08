"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: string;
    location: string;
    price: string;
  };
}

export default function DigitalPassModal({
  isOpen,
  onClose,
  event,
}: DigitalPassModalProps) {
  // Pass details for QR
  const passData = JSON.stringify({
    passId: "ES-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    title: event.title,
    date: event.date,
    location: event.location,
    timestamp: new Date().toISOString(),
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          ></motion.div>

          {/* Pass Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-[#0a0a0a] border border-[#b49b5c]/30 shadow-[0_0_50px_rgba(180,155,92,0.15)] overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#b49b5c] to-transparent"></div>

            <div className="p-8 space-y-8 relative overflow-hidden">
               {/* Background glows */}
               <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#b49b5c]/5 blur-[60px] rounded-full"></div>
               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#b49b5c]/5 blur-[60px] rounded-full"></div>

               <div className="space-y-2 text-center relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold">Official Entry Pass</span>
                  <h3 className="text-2xl font-serif text-white tracking-tight italic">Event Sphere</h3>
               </div>

               {/* QR Code Container */}
               <div className="flex justify-center relative z-10">
                  <div className="p-4 bg-white rounded-xl shadow-[0_0_30px_rgba(180,155,92,0.2)] group transition-all duration-500 hover:scale-[1.02]">
                    <QRCodeSVG 
                      value={passData} 
                      size={180}
                      level="H"
                      includeMargin={false}
                      imageSettings={{
                        src: "/favicon.ico",
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                      }}
                    />
                  </div>
               </div>

               {/* Pass Details */}
               <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Event</p>
                      <p className="text-xs text-[#dcdcdc] font-serif truncate">{event.title}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Access</p>
                      <p className="text-xs text-[#b49b5c] uppercase tracking-wider font-bold italic">VIP Entry</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Date</p>
                      <p className="text-xs text-[#dcdcdc]">{event.date}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Venue</p>
                      <p className="text-xs text-[#dcdcdc] font-light">{event.location}</p>
                    </div>
                  </div>
               </div>

               {/* Pass ID with Perforation effect */}
               <div className="relative pt-6 mt-6 border-t border-dashed border-white/20 text-center z-10">
                  {/* Decorative circles for perforation look */}
                  <div className="absolute -left-[42px] top-[-10px] w-5 h-5 bg-black rounded-full border border-white/10"></div>
                  <div className="absolute -right-[42px] top-[-10px] w-5 h-5 bg-black rounded-full border border-white/10"></div>
                  
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#666] font-mono">
                    {JSON.parse(passData).passId}
                  </p>
               </div>

               <button 
                 onClick={onClose}
                 className="w-full bg-transparent border border-white/10 text-white py-3 uppercase tracking-[0.2em] text-[9px] hover:bg-white hover:text-black transition-all duration-300 relative z-10"
               >
                 Close Pass
               </button>
            </div>
            
            {/* Bottom accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#b49b5c]/50 to-transparent"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
