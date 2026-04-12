"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { properties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under ₦500k", min: 0, max: 500000 },
  { label: "₦500k – ₦1M", min: 500000, max: 1000000 },
  { label: "₦1M – ₦5M", min: 1000000, max: 5000000 },
  { label: "₦5M+", min: 5000000, max: Infinity },
];

const PROPERTY_TYPES = ["house", "apartment", "villa", "land", "commercial"];
const LISTING_TYPES = ["sale", "rent"];
const BEDROOMS = ["1", "2", "3", "4", "5+"];

export default function ListingsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [listingType, setListingType] = useState(searchParams.get("type") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") ?? "");
  const [priceRange, setPriceRange] = useState(0);
  const [minBeds, setMinBeds] = useState("");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Sync from URL on mount
  useEffect(() => {
    setListingType(searchParams.get("type") ?? "");
    setPropertyType(searchParams.get("property_type") ?? "");
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange];
    const q = query.toLowerCase();
    return properties.filter((p) => {
      if (listingType && p.listing_type !== listingType) return false;
      if (propertyType && p.property_type !== propertyType) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (minBeds) {
        const n = minBeds === "5+" ? 5 : parseInt(minBeds);
        if (p.bedrooms < n) return false;
      }
      if (q && !p.title.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q) && !p.property_type.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [listingType, propertyType, priceRange, minBeds, query]);

  function clearFilters() {
    setListingType("");
    setPropertyType("");
    setPriceRange(0);
    setMinBeds("");
    setQuery("");
    router.push("/listings");
  }

  const hasFilters = listingType || propertyType || priceRange > 0 || minBeds || query;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {filtered.length} Properties{listingType ? ` for ${listingType === "sale" ? "Sale" : "Rent"}` : ""}
            </h1>
          </div>

          {/* Desktop quick filters */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {LISTING_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setListingType(listingType === t ? "" : t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize border transition-colors ${
                  listingType === t
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-300"
                }`}
              >
                For {t === "sale" ? "Sale" : "Rent"}
              </button>
            ))}
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setPropertyType(propertyType === t ? "" : t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize border transition-colors ${
                  propertyType === t
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Expanded filters panel */}
        {showFilters && (
          <div className="border-t border-slate-100 bg-white px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Search</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="City, location..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Price range */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400 bg-white"
                >
                  {PRICE_RANGES.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Min bedrooms */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Min Bedrooms</label>
                <div className="flex gap-1.5 flex-wrap">
                  {BEDROOMS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setMinBeds(minBeds === b ? "" : b)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        minBeds === b ? "bg-sky-500 text-white border-sky-500" : "border-slate-200 text-slate-600 hover:border-sky-300"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile listing type */}
              <div className="md:hidden">
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Listing Type</label>
                <div className="flex gap-2">
                  {LISTING_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setListingType(listingType === t ? "" : t)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border capitalize transition-colors ${
                        listingType === t ? "bg-sky-500 text-white border-sky-500" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {t === "sale" ? "Sale" : "Rent"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg mb-2">No properties found</p>
            <p className="text-slate-400 text-sm mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="bg-sky-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
