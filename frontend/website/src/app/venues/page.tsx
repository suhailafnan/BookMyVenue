import dynamic from "next/dynamic";
import { VenueGridSkeleton } from "@/features/venues/components/VenueGrid";

const VenueExplorer = dynamic(
  () => import("@/features/venues/components/VenueExplorer"),
  {
    loading: () => (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 h-28 animate-pulse rounded-lg bg-[#C8B49A]/40" />
        <VenueGridSkeleton />
      </section>
    ),
  }
);

export default function VenuesPage() {
  return (
    <main>
      <VenueExplorer />
    </main>
  );
}
