import Link from "next/link";
import VenueCard from "@/features/venues/components/VenueCard";
import { getVenue, uploadUrl } from "@/features/venues/api";
import { venues as fallbackVenues } from "@/features/venues/data/venues";
import type { Venue } from "@/features/venues/types";

type VenueDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VenueDetailsPage({
  params,
}: VenueDetailsPageProps) {
  const { id } = await params;
  const venue = await loadVenue(id);
  const category =
    typeof venue.category === "string" ? venue.category : venue.category.name;
  const related = fallbackVenues
    .filter((item) => item._id !== venue._id)
    .filter((item) => {
      const itemCategory =
        typeof item.category === "string" ? item.category : item.category.name;
      return itemCategory === category || item.metadata.location === venue.metadata.location;
    })
    .slice(0, 3);
  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(venue.price);

  return (
    <main>
      <section className="bg-[#1E120A] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#C8B49A]">
              {category}
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              {venue.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F7F3EE]">
              {venue.description}
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-6">
            <p className="text-sm text-[#C8B49A]">Starting from</p>
            <p className="mt-2 text-4xl font-bold">{price}</p>
            <p className="mt-2 text-sm text-[#F7F3EE]">
              {venue.stock} booking slots open
            </p>
            <button className="mt-6 w-full rounded-md bg-[#C8481A] px-5 py-3 font-semibold text-white transition hover:bg-[#B8691A]">
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className={`min-h-52 rounded-lg bg-cover bg-center ${
              item === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[440px]" : ""
            }`}
            style={{ backgroundImage: `url('${uploadUrl(venue.image)}')` }}
          />
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <Panel title="Amenities">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                `Capacity ${venue.metadata.capacity}`,
                venue.metadata.parking ? "Parking available" : "Limited parking",
                venue.metadata.ac ? "Air conditioned" : "Natural ventilation",
                venue.metadata.wifi ? "Wi-Fi enabled" : "Wi-Fi on request",
                ...(venue.metadata.amenities || []),
              ].map((amenity) => (
                <div
                  key={amenity}
                  className="rounded-md border border-[#C8B49A]/70 bg-white px-4 py-3 text-sm font-medium text-[#1E120A]"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Availability">
            <div className="flex flex-wrap gap-3">
              {(venue.metadata.availableDates || []).map((date) => (
                <span
                  key={date}
                  className="rounded-full bg-[#F7F3EE] px-4 py-2 text-sm font-semibold text-[#5A3E28]"
                >
                  {new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Location Map">
            <div className="flex min-h-72 items-center justify-center rounded-lg border border-[#C8B49A] bg-[#FDFAF6] p-6 text-center">
              <div>
                <p className="text-lg font-bold text-[#1E120A]">
                  {venue.metadata.location}
                </p>
                <p className="mt-2 text-[#7A6050]">{venue.metadata.address}</p>
              </div>
            </div>
          </Panel>
        </div>

        <aside className="space-y-6">
          <Panel title="Contact Details">
            <div className="space-y-3 text-[#5A3E28]">
              <p className="font-semibold text-[#1E120A]">
                {venue.metadata.contactName || "Venue desk"}
              </p>
              <p>{venue.metadata.contactPhone || "+91 98765 43210"}</p>
              <p>{venue.metadata.address}</p>
            </div>
          </Panel>

          <Panel title="Pricing">
            <p className="text-3xl font-bold text-[#C8481A]">{price}</p>
            <p className="mt-2 text-sm leading-6 text-[#7A6050]">
              Pricing may vary by date, decor scope, catering plan, and guest
              count.
            </p>
          </Panel>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#1E120A]">Related Venues</h2>
          <Link href="/venues" className="font-semibold text-[#C8481A]">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(related.length ? related : fallbackVenues.slice(0, 3)).map((item) => (
            <VenueCard key={item._id} venue={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

async function loadVenue(id: string): Promise<Venue> {
  try {
    return await getVenue(id);
  } catch {
    return fallbackVenues.find((venue) => venue._id === id) || fallbackVenues[0];
  }
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-[#C8B49A]/70 bg-[#FDFAF6] p-6">
      <h2 className="mb-5 text-2xl font-bold text-[#1E120A]">{title}</h2>
      {children}
    </section>
  );
}
