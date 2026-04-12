import Link from "next/link";
import { Home, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Prop<span className="text-sky-400">List</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Nigeria&apos;s trusted platform for finding your perfect property. We connect buyers, renters, and investors with verified listings across the country.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                Victoria Island, Lagos, Nigeria
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                +234 800 PROPLIST
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                hello@proplist.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="text-slate-400 hover:text-sky-400 transition-colors">All Listings</Link></li>
              <li><Link href="/listings?type=sale" className="text-slate-400 hover:text-sky-400 transition-colors">Properties for Sale</Link></li>
              <li><Link href="/listings?type=rent" className="text-slate-400 hover:text-sky-400 transition-colors">Properties for Rent</Link></li>
              <li><Link href="/listings?property_type=land" className="text-slate-400 hover:text-sky-400 transition-colors">Land</Link></li>
              <li><Link href="/listings?property_type=commercial" className="text-slate-400 hover:text-sky-400 transition-colors">Commercial</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-semibold text-white mb-4">Property Types</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings?property_type=house" className="text-slate-400 hover:text-sky-400 transition-colors">Houses</Link></li>
              <li><Link href="/listings?property_type=apartment" className="text-slate-400 hover:text-sky-400 transition-colors">Apartments</Link></li>
              <li><Link href="/listings?property_type=villa" className="text-slate-400 hover:text-sky-400 transition-colors">Villas</Link></li>
              <li><Link href="/listings?property_type=land" className="text-slate-400 hover:text-sky-400 transition-colors">Land</Link></li>
              <li><Link href="/listings?property_type=commercial" className="text-slate-400 hover:text-sky-400 transition-colors">Commercial</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2024 PropList. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
