"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/college-special", label: "College Special" },
  ];

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent text-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link href="/" className="z-50 text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
          Event Sphere
        </Link>

        {/* Desktop Navigation */}
        <div className="space-x-8 lg:space-x-12 font-sans text-[10px] lg:text-xs tracking-[0.2em] uppercase text-[#dcdcdc]/80 hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#b49b5c] transition-colors">
              {link.label}
            </Link>
          ))}
          
          {/* Auth Avatar / Login Button */}
          {session?.user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full bg-[#b49b5c] font-serif text-[#070707] font-bold text-lg flex items-center justify-center border-2 border-transparent hover:border-[#dcdcdc] transition-all"
              >
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/5 py-2 shadow-2xl rounded-sm flex flex-col">
                  <Link 
                    href="/my-orders"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-4 py-3 text-[10px] tracking-[0.2em] text-[#dcdcdc] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase border-b border-white/5"
                  >
                    My Orders
                  </Link>
                  <Link 
                    href="/host"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-4 py-3 text-[10px] tracking-[0.2em] text-[#dcdcdc] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase border-b border-white/5"
                  >
                    Host Your Own
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[10px] tracking-[0.2em] text-[#6b6b6b] hover:text-[#b49b5c] hover:bg-white/5 transition-colors uppercase"
                  >
                    Logout
                  </button>
                </div>
              )}
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

        {/* Mobile Menu Toggle */}
        <button 
          className="z-50 md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-transform duration-300"
          ></motion.span>
          <motion.span 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block transition-opacity duration-300"
          ></motion.span>
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-transform duration-300"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#070707] z-40 flex flex-col items-center justify-center space-y-8 p-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-white hover:text-[#b49b5c] transition-colors tracking-widest flex items-center space-x-4"
              >
                <span className="text-[#b49b5c]/30 text-sm">/</span>
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-8 w-full max-w-xs flex flex-col space-y-4 border-t border-white/5">
              {session?.user ? (
                <>
                  <Link 
                    href="/my-orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-4 text-xs tracking-[0.2em] text-[#dcdcdc] border border-white/10 uppercase"
                  >
                    My Orders
                  </Link>
                  <Link 
                    href="/host"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-4 bg-[#b49b5c] text-[#070707] font-bold uppercase tracking-widest text-xs"
                  >
                    Host Event
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-4 text-[#6b6b6b] text-xs uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-4 bg-[#b49b5c] text-[#070707] font-bold uppercase tracking-widest text-xs"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
