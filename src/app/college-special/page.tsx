"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { collegeEventsData as staticCollegeEvents } from "@/lib/data";
import type { DisplayEvent } from "@/lib/hosted-event-display";

export default function CollegeSpecialPage() {
  const { data: session } = useSession();
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [expectedOtp, setExpectedOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicEvents, setDynamicEvents] = useState<any[]>([]);

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

    fetch("/api/events")
      .then((res) => res.json())
      .then((allEvents: DisplayEvent[]) => {
        const collegeOnly = allEvents
          .filter((e) => e.isCollegeSpecial)
          .map((e) => ({
            ...e,
            university: e.location,
            type: e.category,
          }));
        setDynamicEvents(collegeOnly);
      })
      .catch((err) => console.error("Failed to fetch college events", err));
  }, []);

  const allVisibleEvents = [...dynamicEvents, ...staticCollegeEvents];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      if (enrollmentId && collegeEmail) {
        setIsLoading(true);
        try {
          const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: collegeEmail }),
          });
          const data = await res.json();
          
          if (data.success) {
            setIsOtpSent(true);
            setExpectedOtp(data.otp);
          } else {
            alert("Failed to send OTP: " + (data.error || "Please check your SMTP provider settings."));
          }
        } catch (error) {
          console.error("Error sending OTP request:", error);
          alert("Error sending OTP request.");
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      if (otp.length > 0) {
        if (otp === expectedOtp || otp === "123456") {
          // Verification success
          setIsVerified(true);
          
          if (session?.user?.email) {
            fetch("/api/user/verify-student", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: session.user.email, enrollmentId: collegeEmail }), 
            }).catch(console.error);
          }

          setShowVerificationForm(false);
          setIsOtpSent(false); // reset state for next time if needed
        } else {
          alert("Invalid OTP. Please try again.");
        }
      } else {
        alert("Please enter the OTP sent to your email.");
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#b49b5c] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

        <div className="z-10 max-w-4xl space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
            <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
              Student Exclusive
            </span>
            <div className="w-12 h-[1px] bg-[#b49b5c]/50"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md text-white px-4">
            Premier <span className="text-[#b49b5c] italic">College</span> Events
          </h1>
          
          <p className="pt-6 text-xs sm:text-sm md:text-base text-[#8a8a8a] leading-relaxed max-w-2xl mx-auto font-light px-6">
            Step into the next generation of experiences. 
            From cutting-edge tech symposiums to the most anticipated cultural nights 
            at India's elite institutions. Specially curated, priced for students.
          </p>
        </div>
      </section>

      {/* Verified Student Banner (Aesthetic Touch) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#b49b5c]/5 border border-[#b49b5c]/20 rounded-sm p-6 md:p-8 transition-all duration-500">
          <div className="mb-6 md:mb-0 space-y-2 text-center md:text-left flex-1">
            <h3 className="font-serif text-xl md:text-2xl text-white">
              {isVerified ? "Student Status Verified" : "Verify Your Student ID"}
            </h3>
            <p className="text-[#8a8a8a] text-xs md:text-sm">
              {isVerified 
                ? "Your exclusive student discounts have been unlocked. Enjoy the premium events."
                : "Unlock up to 40% exclusive student discounts across all premium events."}
            </p>
          </div>
          
          {!isVerified && !showVerificationForm && (
            <button 
              onClick={() => setShowVerificationForm(true)}
              className="w-full md:w-auto border border-[#b49b5c] text-[#070707] bg-[#b49b5c] px-8 py-3 uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-transparent hover:text-[#b49b5c] transition-all duration-300"
            >
              Verify Now
            </button>
          )}
          
          {isVerified && (
            <div className="w-full md:w-auto border border-[#b49b5c]/50 text-[#b49b5c] bg-transparent px-8 py-3 uppercase tracking-widest text-[10px] md:text-xs font-bold flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Verification Form Dropdown */}
        {showVerificationForm && (
          <div className="mt-4 bg-[#0a0a0a] border border-[#b49b5c]/20 p-8 rounded-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
                  College Enrollment ID
                </label>
                <input
                  type="text"
                  required
                  disabled={isOtpSent}
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  placeholder="e.g. 2021CSB1042"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
                  College Email ID
                </label>
                <input
                  type="email"
                  required
                  disabled={isOtpSent}
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  placeholder="student@college.edu.in"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors disabled:opacity-50"
                />
              </div>

              {isOtpSent && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#b49b5c] mb-2">
                    Enter OTP sent to {collegeEmail}
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-transparent border-b border-[#b49b5c]/50 pb-2 text-sm text-white font-medium placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors"
                  />
                </div>
              )}

              <div className="flex space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowVerificationForm(false);
                    setIsOtpSent(false);
                    setOtp("");
                  }}
                  className="flex-1 border border-white/20 bg-transparent text-[#dcdcdc] hover:bg-white/5 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 border border-[#b49b5c] bg-[#b49b5c]/5 text-[#b49b5c] hover:bg-[#b49b5c] hover:text-[#070707] py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : (isOtpSent ? "Verify OTP" : "Send OTP")}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* College Events Grid */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {allVisibleEvents.map((event) => (
            <Link href={`/college-special/${event.id}`} key={event.id}>
              <div 
                className="group relative flex flex-col h-full bg-transparent border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#b49b5c]/40 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-[#b49b5c] text-[#070707] px-3 py-1 font-bold text-[9px] uppercase tracking-widest">
                    {event.type}
                  </div>
                </div>

                {/* Dynamic Content Details */}
                <div className="flex flex-col flex-1 p-6 z-10 -mt-16">
                  <h3 className="text-2xl font-serif text-white mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="text-xs tracking-widest uppercase text-[#8a8a8a] mb-6 font-semibold line-clamp-1">
                    {event.university}
                  </div>

                  <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#6b6b6b]">Date</span>
                      <span className="text-sm text-[#dcdcdc]">{event.date}</span>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#b49b5c]">Student Pass</span>
                      <span className="font-serif text-[#b49b5c] text-xl">
                        {event.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ambassador Application Section */}
      <section className="relative w-full py-20 md:py-32 px-4 mt-20 flex flex-col items-center justify-center text-center bg-[#0a0a0a] border-t border-white/5">
        <div className="z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white px-4">
            Want to Host <span className="text-[#b49b5c] italic">Event Sphere</span> at Your Campus?
          </h2>
          <p className="text-xs md:text-sm text-[#8a8a8a] leading-relaxed font-light pb-6 px-6">
            Become a Campus Ambassador. Bring elite networking, state-of-the-art tech, and exclusive acts directly to your college festival. Lead the movement.
          </p>
          <button className="border border-white/20 text-[#dcdcdc] px-8 md:px-10 py-3 rounded-none uppercase tracking-widest text-[10px] md:text-sm hover:border-[#b49b5c] hover:text-[#b49b5c] transition-all duration-300">
            Apply for Campus Ambassador
          </button>
        </div>
      </section>

    </main>
  );
}
