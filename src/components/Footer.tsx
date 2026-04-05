import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#040404] text-[#8a8a8a] border-t border-white/5 pt-20 pb-10 px-4 flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col items-start md:col-span-1">
          <Link href="/" className="text-4xl font-serif text-[#dcdcdc] tracking-widest uppercase mb-4 bg-transparent">
            Event Sphere
          </Link>
          <p className="text-sm font-light leading-relaxed max-w-xs text-[#6b6b6b]">
            Seamless event booking and management, engineering experiences that last a lifetime.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-[#b49b5c] uppercase mb-6">
            Contact
          </h3>
          <div className="space-y-3 text-sm font-light">
            <p className="hover:text-[#dcdcdc] transition-colors"><a href="tel:+91XXXXXXXXX">+91 XXXXXXXXX</a></p>
            <p className="hover:text-[#dcdcdc] transition-colors"><a href="mailto:info@eventsphere.in">info@eventsphere.in</a></p>
          </div>
        </div>

        {/* Address & Policy */}
        <div className="flex flex-col items-start">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-[#b49b5c] uppercase mb-6">
            Location
          </h3>
          <div className="space-y-3 text-sm font-light mb-8">
            <p>Rishihood University</p>
            <p>Sonipat, Haryana</p>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-7xl border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-wide space-y-6 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Event Sphere. All rights reserved.</p>
        <Link 
          href="/privacy" 
          className="border border-[#b49b5c] text-[#b49b5c] px-6 py-2 rounded-none uppercase tracking-widest text-[10px] hover:bg-[#b49b5c] hover:text-[#040404] transition-all duration-300"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
