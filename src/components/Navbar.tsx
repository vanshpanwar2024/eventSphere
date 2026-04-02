import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent text-white py-6 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold tracking-widest uppercase">
          Event Sphere
        </Link>
        <div className="space-x-12 font-sans text-xs tracking-[0.2em] uppercase text-[#dcdcdc]/80">
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
        </div>
      </div>
    </nav>
  );
}
