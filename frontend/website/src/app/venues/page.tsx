"use client";

import { useState } from "react";

import SearchBar from "@/features/venues/components/SearchBar";
import VenueFilters from "@/features/venues/components/VenueFilters";
import VenueGrid from "@/features/venues/components/VenueGrid";

export default function VenuesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);

  return (
    <main>
      <h1>Venue Listing Page</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <VenueFilters
  location={location}
  setLocation={setLocation}
       />

      <VenueGrid
  search={search}
  location={location}
  page={page}
/>
<div className="flex gap-4 p-6">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="border px-4 py-2 rounded"
  >
    Previous
  </button>

  <button
    onClick={() => setPage(page + 1)}
    className="border px-4 py-2 rounded"
  >
    Next
  </button>
  <p>Current Page: {page}</p>
</div>
    </main>
  );
}