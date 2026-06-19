import Link from "next/link";
import Image from "next/image";
import { uploadUrl } from "../api";
import type { Venue } from "../types";
import { formatCurrency } from "@/lib/format";

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const category =
    typeof venue.category === "string" ? venue.category : venue.category.name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#C8B49A]/70 bg-[#FDFAF6] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-[#C8B49A]">
        <Image
          src={uploadUrl(venue.image)}
          alt={venue.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E120A]/50 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A07020]">
              {category}
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#1E120A]">
              {venue.name}
            </h3>
          </div>
          <span className="rounded-full bg-[#F7F3EE] px-3 py-1 text-sm font-semibold text-[#1C2860]">
            {venue.metadata.capacity}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-[#7A6050]">
          {venue.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#C8B49A]/60 pt-4">
          <div>
            <p className="text-sm text-[#7A6050]">{venue.metadata.location}</p>
            <p className="text-lg font-bold text-[#C8481A]">
              {formatCurrency(venue.price)}
            </p>
          </div>

          <Link
            href={`/venues/${venue._id}`}
            className="rounded-md bg-[#C8481A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8A5C10]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
