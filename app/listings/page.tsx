import { Suspense } from "react";
import ListingsClient from "./ListingsClient";

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading listings...</div>}>
      <ListingsClient />
    </Suspense>
  );
}
