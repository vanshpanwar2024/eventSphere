"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import StudentVerificationModal from "@/components/ui/StudentVerificationModal";
import DigitalPassModal from "@/components/ui/DigitalPassModal";
import PaymentGatewayModal from "@/components/ui/PaymentGatewayModal";
import { motion, AnimatePresence } from "framer-motion";

interface BookingSectionProps {
  event: any;
}

export default function BookingSection({ event }: BookingSectionProps) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/verify-student?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.isVerified) {
            setIsVerified(true);
          }
        })
        .catch(console.error);
    }
  }, [session?.user?.email]);

  const handlePurchase = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPurchased(true);
    setIsPassOpen(true);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col h-fit sticky top-32 group overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49b5c]/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#b49b5c]/10 transition-all duration-700"></div>
      
      <h3 className="text-2xl font-serif text-white mb-2 relative z-10 transition-colors group-hover:text-[#b49b5c]">Reserve Your Pass</h3>
      <p className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] mb-8 relative z-10">Limited Availability</p>
      
      <div className="space-y-4 mb-8 relative z-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Date</span>
          <span className="text-[#dcdcdc] text-sm text-right font-light">{event.date}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Time</span>
          <span className="text-[#dcdcdc] text-sm text-right font-light">{event.time}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Standard Amount</span>
          <span className={isVerified ? "line-through text-[#666] text-sm" : "text-xl font-serif text-white"}>{event.price}</span>
        </div>
        
        {isVerified && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center border-b border-[#b49b5c]/20 pb-4 bg-[#b49b5c]/5 p-2 -mx-2 rounded-sm"
          >
            <span className="text-[10px] uppercase tracking-widest text-[#b49b5c] font-bold">Student Price</span>
            <span className="text-2xl font-serif text-[#b49b5c]">Elite Discount</span>
          </motion.div>
        )}
      </div>
      
      <div className="space-y-3 relative z-10">
        {!isVerified ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full border border-[#b49b5c]/30 text-[#b49b5c] py-3 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#b49b5c]/10 transition-all duration-300"
          >
            Verify Student Status
          </button>
        ) : (
          <div className="w-full border border-[#b49b5c]/50 text-[#b49b5c] py-3 uppercase tracking-[0.2em] text-[10px] font-bold text-center bg-[#b49b5c]/5">
             ✓ Access Granted
          </div>
        )}
        
        {!isPurchased ? (
          <button 
            disabled={isPurchasing}
            onClick={handlePurchase}
            className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white hover:text-[#070707] transition-all duration-500 shadow-[0_5px_30px_rgba(180,155,92,0.15)] disabled:opacity-50"
          >
            {isPurchasing ? "Securing Reservation..." : isVerified ? "Purchase VIP Pass" : "Purchase Pass"}
          </button>
        ) : (
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsPassOpen(true)}
            className="w-full bg-transparent border-2 border-[#b49b5c] text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-2 group hover:bg-[#b49b5c]/10 transition-all duration-300 shadow-[0_0_20px_rgba(180,155,92,0.1)]"
          >
            <span className="text-[#b49b5c] animate-pulse">✦</span> Get Digital Pass
          </motion.button>
        )}
      </div>

      <StudentVerificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsVerified(true)}
        eventTitle={event.title}
      />

      <DigitalPassModal 
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        event={{
          title: event.title,
          date: event.date,
          location: event.location,
          price: isVerified ? "Elite Pricing" : event.price
        }}
      />

      <PaymentGatewayModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        event={{
          title: event.title,
          price: isVerified ? "Elite Discount" : event.price,
          date: event.date,
          location: event.location,
          image: event.image
        }}
      />
    </div>
  );
}
