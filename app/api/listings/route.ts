import { NextRequest, NextResponse } from "next/server";

const RENTCAST_BASE = "https://api.rentcast.io/v1";
const KEY = process.env.RENTCAST_API_KEY!;

const STREET_VIEW_KEY = process.env.NEXT_PUBLIC_GOOGLE_STREET_VIEW_KEY!;

function getStreetViewUrl(lat: number, lng: number, width = 800, height = 600) {
  return `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${lat},${lng}&fov=90&pitch=0&key=${STREET_VIEW_KEY}`;
}

function mapPropertyType(type: string): "house" | "apartment" | "villa" | "land" | "commercial" {
  const t = (type || "").toLowerCase();
  if (t.includes("single") || t.includes("house")) return "house";
  if (t.includes("condo") || t.includes("apartment") || t.includes("multi")) return "apartment";
  if (t.includes("land") || t.includes("lot")) return "land";
  if (t.includes("commercial") || t.includes("office")) return "commercial";
  return "house";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city") || "Austin";
  const state = searchParams.get("state") || "TX";
  const bedrooms = searchParams.get("bedrooms") || "";
  const limit = searchParams.get("limit") || "20";

  const params = new URLSearchParams({ city, state, status: "Active", limit });
  if (bedrooms) params.set("bedrooms", bedrooms);

  try {
    const res = await fetch(`${RENTCAST_BASE}/listings/sale?${params.toString()}`, {
      headers: { "X-Api-Key": KEY, accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const raw = await res.json();

    // Map Rentcast data to PropList Property format
    const properties = raw.map((p: any, i: number) => ({
      id: p.id,
      title: `${p.propertyType || "Property"} in ${p.city}, ${p.state}`,
      description: `${p.bedrooms ?? 0}-bed, ${p.bathrooms ?? 0}-bath ${p.propertyType || "property"} in ${p.city}, ${p.state}. ${p.squareFootage ? `${p.squareFootage.toLocaleString()} sqft.` : ""} Listed by ${p.listingAgent?.name || "agent"}.`,
      price: p.price || 0,
      listing_type: "sale" as const,
      property_type: mapPropertyType(p.propertyType),
      bedrooms: p.bedrooms || 0,
      bathrooms: p.bathrooms || 0,
      area_sqft: p.squareFootage || 0,
      location: p.addressLine1 || p.formattedAddress,
      city: p.city,
      state: p.state,
      zip: p.zipCode,
      latitude: p.latitude,
      longitude: p.longitude,
      features: [
        p.yearBuilt ? `Built ${p.yearBuilt}` : null,
        p.lotSize ? `Lot: ${p.lotSize.toLocaleString()} sqft` : null,
        p.hoa?.fee ? `HOA: $${p.hoa.fee}/mo` : null,
        p.listingType || null,
        `MLS: ${p.mlsNumber || "N/A"}`,
      ].filter(Boolean) as string[],
      image: p.latitude && p.longitude ? getStreetViewUrl(p.latitude, p.longitude) : "",
      images: p.latitude && p.longitude ? [
        getStreetViewUrl(p.latitude, p.longitude, 800, 600),
        getStreetViewUrl(p.latitude, p.longitude, 800, 600),
        getStreetViewUrl(p.latitude, p.longitude, 800, 600),
      ] : [],
      agent_name: p.listingAgent?.name || "Agent",
      agent_phone: p.listingAgent?.phone || "",
      agent_email: p.listingAgent?.email || "",
      is_featured: i < 4,
      created_at: p.listedDate ? p.listedDate.split("T")[0] : new Date().toISOString().split("T")[0],
      days_on_market: p.daysOnMarket || 0,
    }));

    return NextResponse.json(properties);
  } catch {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
