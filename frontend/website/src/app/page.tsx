"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getWishlistIds, saveWishlistIds, venues } from "@/features/user/venueStore";

export default function Home() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cities");
  const [eventType, setEventType] = useState("All Events");
  const [capacity, setCapacity] = useState("Any Capacity");
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
  }, []);

  function toggleWishlist(venueId: string) {
    const nextWishlistIds = wishlistIds.includes(venueId)
      ? wishlistIds.filter((id) => id !== venueId)
      : [...wishlistIds, venueId];

    setWishlistIds(nextWishlistIds);
    saveWishlistIds(nextWishlistIds);
  }

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesQuery =
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.tag.toLowerCase().includes(query.toLowerCase());
      const matchesCity = city === "All Cities" || venue.city === city;
      const matchesType =
        eventType === "All Events" || venue.type === eventType;
      const matchesCapacity =
        capacity === "Any Capacity" ||
        (capacity === "Up to 300" && venue.capacity <= 300) ||
        (capacity === "300 - 700" &&
          venue.capacity > 300 &&
          venue.capacity <= 700) ||
        (capacity === "700+" && venue.capacity > 700);

      return matchesQuery && matchesCity && matchesType && matchesCapacity;
    });
  }, [capacity, city, eventType, query]);

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#1E120A]">
      <header className="border-b border-[#E1D4C3] bg-[#FBF8F4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/user/dashboard" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#C8481A] text-sm font-bold text-white shadow-sm">
              BM
            </span>
            <span className="text-2xl font-bold">BookMyVenue</span>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-medium text-[#7A6050] md:flex">
            <Link href="/user/dashboard" className="rounded-lg px-4 py-2 hover:bg-white">
              Home
            </Link>
            <Link href="/" className="rounded-lg bg-[#F2E3DA] px-4 py-2 text-[#C8481A]">
              Search
            </Link>
            <Link href="/user/bookings" className="rounded-lg px-4 py-2 hover:bg-white">
              My Bookings
            </Link>
            <Link href="/user/wishlist" className="rounded-lg px-4 py-2 hover:bg-white">
              Wishlist
            </Link>
          </nav>

          <Link
            href="/login"
            className="rounded-xl border border-[#C8B49A] bg-[#FBF8F4] px-4 py-3 text-sm font-semibold text-[#5A3E28]"
          >
            Exit
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <section className="rounded-3xl bg-[#21120A] p-8 text-white shadow-sm sm:p-12">
          <p className="text-sm font-semibold text-[#C8B49A]">Venue Search</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Find the right venue for your next event
          </h1>
          <p className="mt-4 max-w-2xl text-[#D8C7B5]">
            Search by venue name, city, event type, and guest capacity.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl bg-white p-4 text-[#1E120A] shadow-lg md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#7A6050]">
                Search
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Venue name or hall type"
                className="w-full rounded-xl border border-[#C8B49A] px-4 py-3 outline-none focus:border-[#C8481A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#7A6050]">
                City
              </span>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-xl border border-[#C8B49A] px-4 py-3 outline-none focus:border-[#C8481A]"
              >
                <option>All Cities</option>
                <option>Kochi</option>
                <option>Thrissur</option>
                <option>Calicut</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#7A6050]">
                Event Type
              </span>
              <select
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="w-full rounded-xl border border-[#C8B49A] px-4 py-3 outline-none focus:border-[#C8481A]"
              >
                <option>All Events</option>
                <option>Wedding</option>
                <option>Reception</option>
                <option>Conference</option>
                <option>Birthday</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#7A6050]">
                Guests
              </span>
              <select
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                className="w-full rounded-xl border border-[#C8B49A] px-4 py-3 outline-none focus:border-[#C8481A]"
              >
                <option>Any Capacity</option>
                <option>Up to 300</option>
                <option>300 - 700</option>
                <option>700+</option>
              </select>
            </label>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold">Available Venues</h2>
              <p className="mt-1 text-[#7A6050]">
                {filteredVenues.length} venues match your search.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCity("All Cities");
                setEventType("All Events");
                setCapacity("Any Capacity");
              }}
              className="w-fit rounded-xl border border-[#C8B49A] px-5 py-3 text-sm font-semibold text-[#5A3E28]"
            >
              Clear Filters
            </button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredVenues.map((venue) => (
              <article
                key={venue.name}
                className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#B8691A]">
                      {venue.tag}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{venue.name}</h3>
                    <p className="mt-2 text-[#7A6050]">
                      {venue.city} - {venue.type} - {venue.capacity} guests
                    </p>
                  </div>
                  <span className="font-bold text-[#C8481A]">
                    {venue.price}
                  </span>
                </div>
                <Link
                  href={`/booking/${venue.id}`}
                  className="mt-5 inline-flex rounded-xl bg-[#C8481A] px-5 py-3 font-semibold text-white"
                >
                  Book Venue
                </Link>
                <button
                  type="button"
                  aria-label={
                    wishlistIds.includes(venue.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => toggleWishlist(venue.id)}
                  className="ml-3 mt-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-[#C8B49A] text-[#C8481A]"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill={wishlistIds.includes(venue.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
