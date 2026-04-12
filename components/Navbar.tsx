"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">
              Prop<span className="text-sky-500">List</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/listings" className="text-slate-600 hover:text-sky-500 text-sm font-medium transition-colors">
              Browse Listings
            </Link>
            <Link href="/listings?type=sale" className="text-slate-600 hover:text-sky-500 text-sm font-medium transition-colors">
              Buy
            </Link>
            <Link href="/listings?type=rent" className="text-slate-600 hover:text-sky-500 text-sm font-medium transition-colors">
              Rent
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/listings"
              className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              List Property
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <Link href="/listings" className="block text-slate-700 font-medium py-1" onClick={() => setOpen(false)}>Browse Listings</Link>
          <Link href="/listings?type=sale" className="block text-slate-700 font-medium py-1" onClick={() => setOpen(false)}>Buy</Link>
          <Link href="/listings?type=rent" className="block text-slate-700 font-medium py-1" onClick={() => setOpen(false)}>Rent</Link>
          <Link href="/listings" className="block bg-sky-500 text-white text-center py-2 rounded-lg font-semibold" onClick={() => setOpen(false)}>List Property</Link>
        </div>
      )}
    </nav>
  );
}
