"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event: {
    title: string;
    price: string;
  };
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  onSuccess,
  event,
}: PaymentGatewayModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [upiId, setUpiId] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setPaymentStep("processing");
    setIsProcessing(true);

    // Clean price string, remove anything that isn't a digit or decimal point
    const cleanedPrice = event.price.replace(/[^\d.]/g, '');
    let amountNum = parseFloat(cleanedPrice);

    // If there is no numeric value found (e.g. "Elite Discount"), let's default to a dummy 100 for Razorpay testing
    if (isNaN(amountNum) && !event.price.toLowerCase().includes("free")) {
      amountNum = 100;
    }

    if (amountNum === 0 || event.price.toLowerCase().includes("free")) {
      // Free pass logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentStep("success");
      setIsProcessing(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay failed to load. Are you online?");
      setPaymentStep("form");
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Create an order on our backend
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, currency: "INR" }),
      });
      const data = await response.json();

      if (!data || data.error) {
        throw new Error(data.error || "Order creation failed");
      }

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId", // Enter the Key ID generated from the Dashboard
        amount: data.amount,
        currency: data.currency,
        name: "EventSphere",
        description: `Pass for ${event.title}`,
        image: "https://your-logo-url.png",
        order_id: data.isDemo ? undefined : data.id, 
        handler: function (response: any) {
          // Success handler
          setPaymentStep("success");
          setIsProcessing(false);
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 2000);
        },
        prefill: {
          name: "Aryan Singh",
          email: "aryan@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#b49b5c",
        },
        modal: {
          escape: false,
          ondismiss: function() {
            setPaymentStep("form");
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setPaymentStep("form");
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (error) {
      console.error(error);
      setPaymentStep("form");
      setIsProcessing(false);
      alert("Payment failed");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing ? onClose : undefined}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          ></motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49b5c]/5 blur-[60px] rounded-full"></div>
            
            <div className="relative z-10 space-y-8">
              {paymentStep === "form" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b5c] font-bold">Secure Checkout</span>
                    <h3 className="text-2xl font-serif text-white">Complete Transaction</h3>
                    
                    {/* Method Selector */}
                    <div className="flex bg-[#070707] border border-white/5 p-1 rounded-none mt-6">
                      <button 
                        onClick={() => setPaymentMethod("card")}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest transition-all duration-300 ${paymentMethod === "card" ? "bg-[#b49b5c] text-[#070707] font-bold" : "text-[#666] hover:text-white"}`}
                      >
                        Credit / Debit Card
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("upi")}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest transition-all duration-300 ${paymentMethod === "upi" ? "bg-[#b49b5c] text-[#070707] font-bold" : "text-[#666] hover:text-white"}`}
                      >
                        UPI Payment
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 py-4 border-y border-white/5 mt-6">
                      <div className="text-left">
                        <p className="text-[9px] uppercase tracking-widest text-[#8a8a8a]">Event</p>
                        <p className="text-xs text-white font-serif italic truncate max-w-[150px]">{event.title}</p>
                      </div>
                      <div className="w-[1px] h-8 bg-white/10"></div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest text-[#8a8a8a]">Amount Due</p>
                        <p className="text-xl text-[#b49b5c] font-serif">{event.price}</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    {paymentMethod === "card" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-[#666]">Cardholder Name</label>
                          <input 
                            required
                            type="text"
                            placeholder="ALEXANDER STERLING"
                            className="w-full bg-[#070707] border border-white/10 p-3 text-xs text-white outline-none focus:border-[#b49b5c]/50 transition-colors uppercase tracking-widest"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-[#666]">Card Number</label>
                          <div className="relative">
                            <input 
                              required
                              type="text"
                              placeholder="••••  ••••  ••••  4829"
                              className="w-full bg-[#070707] border border-white/10 p-3 text-xs text-white outline-none focus:border-[#b49b5c]/50 transition-colors tracking-[0.3em]"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                              <div className="w-6 h-4 bg-red-500/20 rounded-sm"></div>
                              <div className="w-6 h-4 bg-orange-500/20 rounded-sm"></div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#666]">Expiry</label>
                            <input 
                              required
                              type="text"
                              placeholder="MM / YY"
                              className="w-full bg-[#070707] border border-white/10 p-3 text-xs text-white outline-none focus:border-[#b49b5c]/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#666]">CVC</label>
                            <input 
                              required
                              type="text"
                              placeholder="•••"
                              className="w-full bg-[#070707] border border-white/10 p-3 text-xs text-white outline-none focus:border-[#b49b5c]/50 transition-colors"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex flex-col items-center gap-4 py-2">
                          <div className="p-3 bg-white rounded-lg shadow-[0_0_20px_rgba(180,155,92,0.1)]">
                             <QRCodeSVG 
                               value={`upi://pay?pa=aryanjr2010@okhdfcbank&pn=Aryan%20Singh&am=${event.price.replace(/[^\d.]/g, '')}&cu=INR`} 
                               size={140}
                             />
                          </div>
                          <p className="text-[9px] uppercase tracking-[0.3em] text-[#b49b5c] font-bold text-center">
                            Scan to Pay Aryan Singh<br/>
                            <span className="text-[#666] tracking-[0.1em] mt-1 block">Powered by BHIM UPI</span>
                          </p>
                        </div>
                        
                        <div className="relative">
                           <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-white/5"></div>
                           </div>
                           <div className="relative flex justify-center text-[9px] uppercase tracking-widest text-[#444]">
                              <span className="bg-[#0a0a0a] px-3 italic">or enter VPA</span>
                           </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-[#666]">Verify Payment from VPA</label>
                          <input 
                            required
                            type="text"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full bg-[#070707] border border-white/10 p-4 text-xs text-white outline-none focus:border-[#b49b5c]/50 transition-colors tracking-[0.1em]"
                          />
                        </div>
                      </motion.div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-500 mt-2 shadow-[0_10px_30px_rgba(180,155,92,0.15)]"
                    >
                      {paymentMethod === "card" ? "Authorize Payment" : "Verify & Pay"}
                    </button>
                    <button 
                      type="button"
                      onClick={onClose}
                      className="w-full text-[#666] text-[9px] uppercase tracking-widest pt-2 hover:text-white transition-colors"
                    >
                      Cancel Transaction
                    </button>
                  </form>
                </motion.div>
              )}

              {paymentStep === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center space-y-8"
                >
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 border-2 border-[#b49b5c]/10 border-t-[#b49b5c] rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[#b49b5c] text-xl">✦</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold animate-pulse">Encrypting</p>
                    <h3 className="text-2xl font-serif text-white italic">Verifying Authorization</h3>
                    <p className="text-xs text-[#666] font-light">Secure gateway connection with merchant bank...</p>
                  </div>
                </motion.div>
              )}

              {paymentStep === "success" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-20 text-center space-y-8"
                >
                  <div className="w-20 h-20 bg-[#b49b5c]/10 border border-[#b49b5c]/50 rounded-full flex items-center justify-center mx-auto">
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      className="text-3xl text-[#b49b5c]"
                    >
                      ✓
                    </motion.span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold">Confirmed</p>
                    <h3 className="text-3xl font-serif text-white italic">Payment Successful</h3>
                    <p className="text-xs text-[#8a8a8a] uppercase tracking-[0.2em] font-light">Your reservation has been secured</p>
                  </div>
                  <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full max-w-[200px] mx-auto">
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
        </div>
      )}
    </AnimatePresence>
  );
}
