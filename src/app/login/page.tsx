"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (res?.ok) {
      router.push("/");
    } else {
      alert("Authentication failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-[#dcdcdc] font-light placeholder:text-[#333] focus:outline-none focus:border-[#b49b5c] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-[#b49b5c] bg-[#b49b5c]/5 text-[#b49b5c] hover:bg-[#b49b5c] hover:text-[#070707] py-3 mt-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              {isLoginView ? "Sign In" : "Sign Up"}
            </button>

            <div className="relative flex items-center justify-center my-6">
              <div className="w-full h-[1px] bg-white/10"></div>
              <span className="absolute bg-[#0a0a0a] px-3 text-[10px] tracking-widest text-[#6b6b6b] uppercase">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full border border-white/20 bg-transparent text-[#dcdcdc] hover:bg-white/5 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span>Continue with Google</span>
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