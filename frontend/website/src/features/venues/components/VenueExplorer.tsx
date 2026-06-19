"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useVenues } from "@/hooks/useVenues";
import VenueFilters from "./VenueFilters";
import VenueGrid from "./VenueGrid";

const PAGE_SIZE = 6;

export default function VenueExplorer() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);

  const query = useMemo(
    () => ({
      search,
      category,
      city,
      sort,
      page,
      limit: PAGE_SIZE,
    }),
    [search, category, city, sort, page]
  );
  const { venues, categories, cities, totalPages, isLoading, error } =
    useVenues(query);

  const resetPage = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
            Curated venues
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#1E120A]">
            Discover Venues
          </h1>
        </div>

        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search by venue name"
          className="h-12 w-full rounded-md border border-[#C8B49A] bg-white px-4 text-sm outline-none transition focus:border-[#C8481A] focus:ring-2 focus:ring-[#C8481A]/15 lg:max-w-sm"
        />
      </div>

      <div className="mb-8 rounded-lg border border-[#C8B49A]/70 bg-[#FDFAF6] p-4">
        <VenueFilters
          city={city}
          category={category}
          sort={sort}
          cities={cities}
          categories={categories}
          setCity={resetPage(setCity)}
          setCategory={resetPage(setCategory)}
          setSort={resetPage(setSort)}
        />
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-[#B8691A]/40 bg-[#FDFAF6] px-4 py-3 text-sm text-[#5A3E28]">
          Live API unavailable: {error}. Showing sample venues.
        </div>
      )}

      <VenueGrid venues={venues} isLoading={isLoading} />

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setPage((value) => Math.max(value - 1, 1))}
          disabled={page === 1}
          className="rounded-md border border-[#C8B49A] px-4 py-2 text-sm font-semibold text-[#1E120A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <p className="text-sm font-medium text-[#7A6050]">
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
          disabled={page === totalPages}
          className="rounded-md bg-[#1C2860] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
