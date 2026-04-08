"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StudentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventTitle: string;
}

export default function StudentVerificationModal({
  isOpen,
  onClose,
  onSuccess,
  eventTitle,
}: StudentVerificationModalProps) {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sentOtp, setSentOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setError(null);
    }
  }, [isOpen]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSentOtp(data.otp);
        setStep("otp");
      } else {
        setError(data.error || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    setLoading(true);
    
    // Simulate verification delay
    await new Promise((r) => setTimeout(r, 1000));
    
    if (enteredOtp === sentOtp || enteredOtp === "123456") { // 123456 for testing override if needed
      setStep("success");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } else {
      setError("Invalid security code. Please check and try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0a0a0a] border border-[#b49b5c]/30 p-8 relative overflow-hidden"
            >
              {/* Background gradient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#b49b5c]/10 blur-[60px] rounded-full pointer-events-none"></div>
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-[#8a8a8a] hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="relative z-10">
                {step === "email" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2">
                       <span className="text-[#b49b5c] text-[10px] uppercase tracking-[0.3em] font-bold">Verification</span>
                       <h3 className="text-2xl font-serif text-white">Student Exclusive</h3>
                       <p className="text-xs text-[#8a8a8a] font-light">Verify your academic status to unlock preferred pricing for <br/><span className="text-[#dcdcdc] italic">"{eventTitle}"</span></p>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#8a8a8a]">Academic Email</label>
                          <input 
                            required
                            type="email"
                            placeholder="your.name@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#070707] border border-white/10 p-4 text-sm text-white focus:border-[#b49b5c] outline-none transition-colors"
                          />
                       </div>
                       {error && <p className="text-red-500 text-[10px] uppercase tracking-wider">{error}</p>}
                       <button 
                         disabled={loading}
                         className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-300 disabled:opacity-50"
                       >
                         {loading ? "Discovering Identity..." : "Send Verification Code"}
                       </button>
                    </form>
                  </motion.div>
                )}

                {step === "otp" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-2">
                       <span className="text-[#b49b5c] text-[10px] uppercase tracking-[0.3em] font-bold">Security</span>
                       <h3 className="text-2xl font-serif text-white">Check Your Inbox</h3>
                       <p className="text-xs text-[#8a8a8a] font-light italic">A unique code has been sent to your academic portal.</p>
                    </div>

                    <div className="flex justify-between gap-1 sm:gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={digit}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          className="w-10 h-12 sm:w-12 sm:h-14 bg-[#070707] border border-white/10 text-center text-lg sm:text-xl text-[#b49b5c] font-serif focus:border-[#b49b5c] outline-none transition-all"
                        />
                      ))}
                    </div>

                    {error && <p className="text-center text-red-500 text-[10px] uppercase tracking-wider">{error}</p>}

                    <div className="space-y-4">
                       <button 
                         onClick={handleVerifyOtp}
                         disabled={loading || otp.some(d => !d)}
                         className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-300 disabled:opacity-50"
                       >
                         {loading ? "Validating Credentials..." : "Unlock Student Pass"}
                       </button>
                       <button 
                         onClick={() => setStep("email")}
                         className="w-full text-[#8a8a8a] py-2 uppercase tracking-[0.2em] text-[9px] hover:text-white transition-colors"
                       >
                         Wrong email? Go back
                       </button>
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-20 h-20 bg-[#b49b5c]/10 border border-[#b49b5c]/50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <motion.span 
                         initial={{ scale: 0 }}
                         animate={{ scale: [0, 1.2, 1] }}
                         className="text-3xl text-[#b49b5c]"
                       >
                         ✦
                       </motion.span>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-serif text-white italic">Verified</h3>
                       <p className="text-xs text-[#8a8a8a] uppercase tracking-[0.2em]">Welcome to the Inner Circle</p>
                    </div>
                    <div className="h-1 w-full bg-white/5 overflow-hidden">
                       <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: "0%" }}
                         transition={{ duration: 1.5, ease: "easeInOut" }}
                         className="h-full w-full bg-[#b49b5c]"
                       />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
