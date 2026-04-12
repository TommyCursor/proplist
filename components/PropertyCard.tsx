import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { Property, formatPrice } from "@/lib/data";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/listings/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            property.listing_type === "sale"
              ? "bg-sky-500 text-white"
              : "bg-emerald-500 text-white"
          }`}>
            For {property.listing_type === "sale" ? "Sale" : "Rent"}
          </span>
          {property.is_featured && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-amber-900">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 capitalize">
            {property.property_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-2xl font-bold text-slate-900 mb-1">
          {formatPrice(property.price, property.listing_type)}
        </p>
        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{property.location}, {property.city}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? "s" : ""}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? "s" : ""}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            <Maximize2 className="w-4 h-4" />
            <span>{property.area_sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
