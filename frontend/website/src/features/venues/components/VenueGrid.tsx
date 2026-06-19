import VenueCard from "./VenueCard";
import type { Venue } from "../types";

type VenueGridProps = {
  venues: Venue[];
  isLoading?: boolean;
};

export function VenueGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-lg border border-[#C8B49A]/60 bg-white"
        >
          <div className="h-52 rounded-t-lg bg-[#C8B49A]/50" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-24 rounded bg-[#C8B49A]/50" />
            <div className="h-7 w-4/5 rounded bg-[#C8B49A]/50" />
            <div className="h-16 rounded bg-[#C8B49A]/40" />
            <div className="h-10 rounded bg-[#C8B49A]/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VenueGrid({ venues, isLoading }: VenueGridProps) {
  if (isLoading) {
    return <VenueGridSkeleton />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {venues.length === 0 ? (
        <div className="col-span-full rounded-lg border border-[#C8B49A] bg-white p-8 text-center text-[#5A3E28] sm:p-10">
          <h2 className="text-xl font-bold text-[#1E120A]">No venues found</h2>
          <p className="mt-2 text-sm">Try a different city, category, or search term.</p>
        </div>
      ) : (
        venues.map((venue) => <VenueCard key={venue._id} venue={venue} />)
      )}
    </div>
  );
}
