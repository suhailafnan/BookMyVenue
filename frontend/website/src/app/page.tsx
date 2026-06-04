"use client";

import { useState } from "react";

import Hero from "@/features/venues/components/Hero";
import SearchBar from "@/features/venues/components/SearchBar";
import VenueGrid from "@/features/venues/components/VenueGrid";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main>
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <VenueGrid search={search} />
    </main>
  );
}