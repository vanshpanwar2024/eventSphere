"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Call mock login
    router.push("/"); // Redirect to home
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-[#070707] px-4 pt-20">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Decorative faint glow */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#b49b5c]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h1 className="text-3xl font-serif tracking-widest text-[#dcdcdc] mb-2 uppercase text-center relative z-10">
            {isLoginView ? "Welcome Back" : "Join the Sphere"}
          </h1>
          <p className="text-sm font-light text-[#8a8a8a] text-center mb-10 relative z-10">
            {isLoginView
              ? "Sign in to manage your bookings and events."
              : "Create an account to start engineering experiences."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {!isLoginView && (
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="hello@example.com"
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 border border-[#b49b5c] bg-[#b49b5c]/5 text-[#b49b5c] hover:bg-[#b49b5c] hover:text-[#070707] py-3 mt-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              {isLoginView ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center text-xs font-light text-[#8a8a8a] relative z-10">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-[#b49b5c] hover:text-[#dcdcdc] transition-colors uppercase tracking-[0.1em]"
            >
              {isLoginView ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}