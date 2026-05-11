"use client";
import Link from 'next/link';

const Navbar = () => (
  <nav className="sticky top-0 z-[200] bg-white border-b border-[#e8e6e2] h-[66px] flex items-center justify-between px-6 md:px-14">
    <Link href="/" className="font-serif text-2xl font-medium tracking-wider">
      Altis<span className="text-[#b89a5a]">.</span>
    </Link>
    <ul className="hidden md:flex gap-8 text-[11px] font-medium tracking-[0.12em] uppercase text-[#4a4845]">
      <li><Link href="/properties" className="hover:text-[#b89a5a] transition-colors">Properties</Link></li>
      <li><Link href="#" className="hover:text-[#b89a5a] transition-colors">Listings</Link></li>
      <li><Link href="#" className="hover:text-[#b89a5a] transition-colors">Developments</Link></li>
      <li><Link href="#" className="hover:text-[#b89a5a] transition-colors">About</Link></li>
    </ul>
    <button className="bg-[#0f1f3d] text-white px-5 py-2 rounded text-[11px] font-medium uppercase tracking-wider hover:bg-[#b89a5a] transition-all">
      Contact Us
    </button>
  </nav>
);

export default Navbar;
