"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event: {
    title: string;
    price: string;
    date?: string;
    location?: string;
    image?: string;
  };
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  onSuccess,
  event,
}: PaymentGatewayModalProps) {
  const [paymentStep, setPaymentStep] = useState<"confirm" | "processing" | "success" | "failed">("confirm");
  const [errorMessage, setErrorMessage] = useState("");

  const loadRazorpayScript = (): Promise<boolean> => {
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

  const handlePayment = async () => {
    setPaymentStep("processing");
    setErrorMessage("");

    // Clean price string, remove anything that isn't a digit or decimal point
    const cleanedPrice = event.price.replace(/[^\d.]/g, "");
    let amountNum = parseFloat(cleanedPrice);

    // If no numeric value found (e.g. "Elite Discount"), default to ₹100
    if (isNaN(amountNum) && !event.price.toLowerCase().includes("free")) {
      amountNum = 100;
    }

    // Free pass — skip Razorpay entirely
    if (amountNum === 0 || event.price.toLowerCase().includes("free")) {
      try {
        await fetch("/api/save-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: {
              title: event.title,
              date: event.date || "",
              location: event.location || "",
              image: event.image || ""
            },
            ticket: {
              price: "Free",
              type: "Free Pass"
            }
          }),
        });
      } catch (e) {
        console.error("Error saving free order:", e);
      }

      await new Promise((r) => setTimeout(r, 800));
      setPaymentStep("success");
      setTimeout(() => {
        onSuccess();
        onClose();
        resetModal();
      }, 2000);
      return;
    }

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setErrorMessage("Razorpay failed to load. Check your internet connection.");
      setPaymentStep("failed");
      return;
    }

    try {
      // Step 1: Create order on our backend
      const orderRes = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, currency: "INR" }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.error) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // Step 2: Open Razorpay Standard Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EventSphere",
        description: `Pass for ${event.title}`,
        order_id: orderData.id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Step 3: Verify payment signature on backend
          try {
            setPaymentStep("processing");
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                event: {
                  title: event.title,
                  date: event.date || "",
                  location: event.location || "",
                  image: event.image || ""
                },
                ticket: {
                  price: event.price,
                  type: "Standard Pass"
                }
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              setPaymentStep("success");
              setTimeout(() => {
                onSuccess();
                onClose();
                resetModal();
              }, 2000);
            } else {
              setErrorMessage("Payment verification failed. Contact support.");
              setPaymentStep("failed");
            }
          } catch {
            setErrorMessage("Could not verify payment. Contact support.");
            setPaymentStep("failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#b49b5c",
        },
        modal: {
          escape: true,
          ondismiss: function () {
            setPaymentStep("confirm");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        setErrorMessage(
          response.error.description || "Payment failed. Please try again."
        );
        setPaymentStep("failed");
      });

      rzp.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setPaymentStep("failed");
    }
  };

  const resetModal = () => {
    setPaymentStep("confirm");
    setErrorMessage("");
  };

  const handleClose = () => {
    if (paymentStep !== "processing") {
      onClose();
      resetModal();
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
            onClick={handleClose}
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
              {/* CONFIRM STEP — shows order summary and pay button */}
              {paymentStep === "confirm" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b5c] font-bold">
                      Secure Checkout
                    </span>
                    <h3 className="text-2xl font-serif text-white">
                      Complete Transaction
                    </h3>

                    <div className="flex items-center justify-center gap-4 py-6 border-y border-white/5 mt-6">
                      <div className="text-left">
                        <p className="text-[9px] uppercase tracking-widest text-[#8a8a8a]">
                          Event
                        </p>
                        <p className="text-xs text-white font-serif italic truncate max-w-[180px]">
                          {event.title}
                        </p>
                      </div>
                      <div className="w-[1px] h-8 bg-white/10"></div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest text-[#8a8a8a]">
                          Amount Due
                        </p>
                        <p className="text-xl text-[#b49b5c] font-serif">
                          {event.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment methods info */}
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-widest text-[#666] text-center">
                      Supported Payment Methods
                    </p>
                    <div className="flex justify-center gap-3">
                      {["UPI", "Cards", "Net Banking", "Wallets"].map((method) => (
                        <span
                          key={method}
                          className="text-[9px] uppercase tracking-wider text-[#8a8a8a] border border-white/10 px-3 py-1.5 bg-white/[0.02]"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(180,155,92,0.15)]"
                  >
                    Pay with Razorpay
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full text-[#666] text-[9px] uppercase tracking-widest pt-1 hover:text-white transition-colors"
                  >
                    Cancel Transaction
                  </button>
                </motion.div>
              )}

              {/* PROCESSING STEP */}
              {paymentStep === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center space-y-8"
                >
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border-2 border-[#b49b5c]/10 border-t-[#b49b5c] rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[#b49b5c] text-xl">
                      ✦
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold animate-pulse">
                      Processing
                    </p>
                    <h3 className="text-2xl font-serif text-white italic">
                      Verifying Payment
                    </h3>
                    <p className="text-xs text-[#666] font-light">
                      Confirming with Razorpay gateway...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS STEP */}
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
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#b49b5c] font-bold">
                      Confirmed
                    </p>
                    <h3 className="text-3xl font-serif text-white italic">
                      Payment Successful
                    </h3>
                    <p className="text-xs text-[#8a8a8a] uppercase tracking-[0.2em] font-light">
                      Your reservation has been secured
                    </p>
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

              {/* FAILED STEP */}
              {paymentStep === "failed" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-16 text-center space-y-8"
                >
                  <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl text-red-400">✕</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-red-400 font-bold">
                      Payment Failed
                    </p>
                    <h3 className="text-2xl font-serif text-white italic">
                      Transaction Unsuccessful
                    </h3>
                    <p className="text-xs text-[#8a8a8a] font-light max-w-[300px] mx-auto">
                      {errorMessage}
                    </p>
                  </div>
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={handlePayment}
                      className="w-full bg-[#b49b5c] text-[#070707] py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-500"
                    >
                      Retry Payment
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full text-[#666] text-[9px] uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
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
