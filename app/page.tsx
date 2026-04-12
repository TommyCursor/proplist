"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Home, Building2, Trees, Warehouse, TrendingUp, Shield, Clock, Star } from "lucide-react";
import { getFeatured } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

const featured = getFeatured();

const STATS = [
  { label: "Active Listings", value: "2,400+", icon: Home },
  { label: "Cities Covered", value: "18", icon: MapPin },
  { label: "Happy Clients", value: "10,000+", icon: Star },
  { label: "Agents Verified", value: "340+", icon: Shield },
];

const CATEGORIES = [
  { label: "Houses", icon: Home, href: "/listings?property_type=house", count: "820+" },
  { label: "Apartments", icon: Building2, href: "/listings?property_type=apartment", count: "1,200+" },
  { label: "Land", icon: Trees, href: "/listings?property_type=land", count: "350+" },
  { label: "Commercial", icon: Warehouse, href: "/listings?property_type=commercial", count: "180+" },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [listingType, setListingType] = useState("sale");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ type: listingType });
    if (query) params.set("q", query);
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Hero property"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-900/65" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            Nigeria&apos;s #1 Real Estate Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Find Your <span className="text-sky-400">Dream Home</span><br />in Nigeria
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Browse thousands of verified properties for sale and rent across Lagos, Abuja, Port Harcourt, and beyond.
          </p>

          {/* Search box */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-3 shadow-2xl flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              {["sale", "rent"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setListingType(t)}
                  className={`px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                    listingType === t ? "bg-sky-500 text-white" : "text-slate-600"
                  }`}
                >
                  {t === "sale" ? "Buy" : "Rent"}
                </button>
              ))}
            </div>
            <div className="flex-1 flex items-center gap-2 px-2">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, location, or property type..."
                className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-sky-500" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Browse by Type</h2>
            <p className="text-slate-500 mt-1">Find the right property category for you</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 bg-white hover:bg-sky-50 hover:border-sky-200 transition-all duration-200 text-center shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 bg-sky-50 group-hover:bg-sky-100 rounded-2xl flex items-center justify-center mb-3 transition-colors">
                <cat.icon className="w-7 h-7 text-sky-500" />
              </div>
              <p className="font-semibold text-slate-800 group-hover:text-sky-700">{cat.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{cat.count} listings</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Properties</h2>
              <p className="text-slate-500 mt-1">Hand-picked listings from our top agents</p>
            </div>
            <Link href="/listings" className="text-sky-500 hover:text-sky-700 text-sm font-semibold transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why PropList */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose PropList?</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">We make finding your next property simple, safe, and stress-free.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verified Listings", desc: "Every property is manually reviewed and verified by our team before going live." },
            { icon: Clock, title: "Fast & Easy", desc: "Search, filter, and contact agents in minutes. No unnecessary steps or hidden fees." },
            { icon: Star, title: "Top Agents", desc: "We partner only with experienced, trusted agents with proven track records." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 rounded-2xl bg-sky-50 border border-sky-100">
              <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-sky-500 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Home?</h2>
          <p className="text-sky-100 mb-8">Join over 10,000 Nigerians who found their perfect property on PropList.</p>
          <Link
            href="/listings"
            className="inline-block bg-white text-sky-600 font-bold px-8 py-3.5 rounded-xl hover:bg-sky-50 transition-colors shadow-lg"
          >
            Browse All Listings
          </Link>
        </div>
      </section>
    </>
  );
}
