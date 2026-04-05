"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent text-white py-6 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link href="/" className="text-4xl font-serif font-bold tracking-widest uppercase bg-transparent">
          Event Sphere
        </Link>
        <div className="space-x-12 font-sans text-xs tracking-[0.2em] uppercase text-[#dcdcdc]/80 hidden md:flex items-center">
          <Link href="/" className="hover:text-[#b49b5c] transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#b49b5c] transition-colors">
            About
          </Link>
          <Link href="/events" className="hover:text-[#b49b5c] transition-colors">
            Events
          </Link>
          <Link href="/college-special" className="hover:text-[#b49b5c] transition-colors">
             College Special
          </Link>
          
          {/* Mock Auth Avatar / Login Button */}
          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full bg-[#b49b5c] font-serif text-[#070707] font-bold text-lg flex items-center justify-center border-2 border-transparent hover:border-[#dcdcdc] transition-all"
              >
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </button>
              {
                showDropdown && (
                  <div className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/5 py-2 shadow-2xl rounded-sm flex flex-col">
                    <Link 
                      href="/my-orders"
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-3 text-xs tracking-[0.2em] text-[#dcdcdc] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase border-b border-white/5"
                    >
                      My Orders
                    </Link>
                    <Link 
                      href="/host"
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-3 text-xs tracking-[0.2em] text-[#dcdcdc] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase border-b border-white/5"
                    >
                      Host Your Own
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-xs tracking-[0.2em] text-[#6b6b6b] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase"
                    >
                      Logout
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
             <Link 
              href="/login" 
              className="border border-[#b49b5c] text-[#b49b5c] px-5 py-2 rounded-none hover:bg-[#b49b5c] hover:text-[#070707] transition-colors"
             >
               Sign In
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
