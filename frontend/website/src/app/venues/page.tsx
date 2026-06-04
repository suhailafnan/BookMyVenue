"use client";

import { useState } from "react";

import SearchBar from "@/features/venues/components/SearchBar";
import VenueFilters from "@/features/venues/components/VenueFilters";
import VenueGrid from "@/features/venues/components/VenueGrid";

export default function VenuesPage() {
  const [search, setSearch] = useState("");

  return (
    <main>
      <h1>Venue Listing Page</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <VenueFilters />

      <VenueGrid search={search} />
    </main>
  );
}