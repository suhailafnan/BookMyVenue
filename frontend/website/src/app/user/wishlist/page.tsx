"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getWishlistIds,
  saveWishlistIds,
  venues,
  Venue,
} from "@/features/user/venueStore";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistVenues, setWishlistVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const ids = getWishlistIds();

    setWishlistIds(ids);
    setWishlistVenues(venues.filter((venue) => ids.includes(venue.id)));
  }, []);

  function removeVenue(venueId: string) {
    const nextWishlistIds = wishlistIds.filter((id) => id !== venueId);

    setWishlistIds(nextWishlistIds);
    setWishlistVenues(
      venues.filter((venue) => nextWishlistIds.includes(venue.id))
    );
    saveWishlistIds(nextWishlistIds);
  }

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10 text-[#1E120A]">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/user/dashboard"
              className="text-sm font-semibold text-[#B8691A]"
            >
              Back to Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Wishlist</h1>
            <p className="mt-2 text-[#7A6050]">
              Venues you saved for quick comparison and booking.
            </p>
          </div>
          <Link
            href="/"
            className="w-fit rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C8481A]/20"
          >
            Find More Venues
          </Link>
        </div>

        {wishlistVenues.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#E8DDD0] bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold">No saved venues yet</h2>
            <p className="mt-2 text-[#7A6050]">
              Save venues from search and they will appear here.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white"
            >
              Search Venues
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {wishlistVenues.map((venue) => (
              <article
                key={venue.id}
                className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm"
              >
                <div className="grid h-32 place-items-center rounded-xl bg-[#F7F3EE] text-sm font-bold text-[#C8481A]">
                  {venue.tag}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#B8691A]">
                    {venue.city} - {venue.type}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{venue.name}</h2>
                  <p className="mt-2 text-[#7A6050]">
                    Up to {venue.capacity} guests
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-bold text-[#C8481A]">
                    {venue.price}
                  </span>
                  <span className="rounded-full bg-[#EFE7DF] px-3 py-1 text-sm font-semibold text-[#7A6050]">
                    Saved
                  </span>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/booking/${venue.id}`}
                    className="flex-1 rounded-xl bg-[#C8481A] px-4 py-3 text-center font-semibold text-white"
                  >
                    Book Venue
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeVenue(venue.id)}
                    className="rounded-xl border border-[#C8B49A] px-4 py-3 font-semibold text-[#5A3E28]"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
