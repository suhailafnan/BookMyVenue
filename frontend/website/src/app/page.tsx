import Link from "next/link";
import Image from "next/image";
import VenueCard from "@/features/venues/components/VenueCard";
import HomeSearch from "@/features/venues/components/HomeSearch";
import { fallbackCategories, venues } from "@/features/venues/data/venues";
import { getCategories, getVenues } from "@/services/api";

export default async function Home() {
  const { homeVenues, categories } = await loadHomeData();
  const featuredVenues = homeVenues.slice(0, 3);
  const popularVenues = homeVenues.slice(3, 6);
  const cityOptions = Array.from(
    new Set(homeVenues.map((venue) => venue.metadata.location).filter(Boolean))
  );
  const categoryOptions = categories.map((category) => category.name);

  return (
    <main>
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#1E120A]">
        <Image
          src="/images/hero.jpg"
          alt="Premium venue interior"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#1E120A]/60" />
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C8B49A]">
            Premium venue booking
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            BookMyVenue
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#F7F3EE] sm:text-lg sm:leading-8">
            Discover wedding halls, banquet homes, boardrooms, and garden
            venues with transparent pricing, availability, and venue details.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/venues"
              className="rounded-md bg-[#C8481A] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#B8691A]"
            >
              Explore Venues
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/70 px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-[#1E120A]"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <HomeSearch categories={categoryOptions} cities={cityOptions} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading label="Featured" title="Handpicked Venues" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredVenues.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      </section>

      <section className="bg-[#FDFAF6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Popular" title="Most Booked Spaces" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {popularVenues.map((venue) => (
              <VenueCard key={venue._id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading label="Categories" title="Plan by Occasion" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/venues?category=${category.name}`}
              className="rounded-lg border border-[#C8B49A] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-[#1E120A]">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#7A6050]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#1C2860] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            "The shortlist and pricing helped us close a wedding venue in one afternoon.",
            "Clean inventory, clear capacity numbers, and fast vendor responses.",
            "The corporate venue filters saved our event team hours of calls.",
          ].map((quote, index) => (
            <blockquote
              key={quote}
              className="rounded-lg border border-white/15 bg-white/10 p-6"
            >
              <p className="text-lg leading-8">{quote}</p>
              <footer className="mt-5 text-sm text-[#C8B49A]">
                Verified host {index + 1}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}

async function loadHomeData() {
  try {
    const [venueResponse, categoryResponse] = await Promise.all([
      getVenues({ page: 1, limit: 6, sort: "createdAt:desc" }),
      getCategories(),
    ]);

    return {
      homeVenues: venueResponse.data.length ? venueResponse.data : venues,
      categories: categoryResponse.length ? categoryResponse : fallbackCategories,
    };
  } catch {
    return {
      homeVenues: venues,
      categories: fallbackCategories,
    };
  }
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-[#1E120A] md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
