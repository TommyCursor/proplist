"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bath, Maximize2, MapPin, Phone, Mail, Check, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getProperty, formatPrice } from "@/lib/data";

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = getProperty(params.id);
  if (!property) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `Hi, I'm interested in "${property.title}". Please contact me.` });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link href="/listings" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-500 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-200 h-80 md:h-[450px]">
              <Image
                src={property.images[activeImage]}
                alt={property.title}
                fill
                className="object-cover"
                unoptimized
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${property.listing_type === "sale" ? "bg-sky-500 text-white" : "bg-emerald-500 text-white"}`}>
                  For {property.listing_type === "sale" ? "Sale" : "Rent"}
                </span>
                {property.is_featured && (
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-400 text-amber-900">Featured</span>
                )}
              </div>
              {/* Nav arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i === 0 ? property.images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i === property.images.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-3">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${i === activeImage ? "border-sky-500" : "border-transparent"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            {/* Title + price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {property.location}, {property.city}, {property.state}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-sky-500">{formatPrice(property.price, property.listing_type)}</p>
                  <p className="text-xs text-slate-400 mt-0.5 capitalize">{property.property_type}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6 pt-5 border-t border-slate-100 flex-wrap">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                      <Bed className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{property.bedrooms}</p>
                      <p className="text-xs text-slate-400">Bedrooms</p>
                    </div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                      <Bath className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{property.bathrooms}</p>
                      <p className="text-xs text-slate-400">Bathrooms</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{property.area_sqft.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Sq. Ft.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-sky-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-sky-500" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — agent + contact */}
          <div className="space-y-6">

            {/* Agent card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-36">
              <h3 className="font-bold text-slate-900 mb-4">Contact Agent</h3>

              {/* Agent info */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {property.agent_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{property.agent_name}</p>
                  <p className="text-sm text-slate-500">Verified Agent</p>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <a href={`tel:${property.agent_phone}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                  <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  {property.agent_phone}
                </a>
                <a href={`mailto:${property.agent_email}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                  <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  {property.agent_email}
                </a>
              </div>

              {/* Contact form */}
              {sent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-700 font-semibold text-sm">Message sent!</p>
                  <p className="text-emerald-600 text-xs mt-1">The agent will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                  <input
                    placeholder="Your phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
