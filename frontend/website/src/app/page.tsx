import Hero from "@/features/venues/components/Hero";
import SearchBar from "@/features/venues/components/SearchBar";
import VenueGrid from "@/features/venues/components/VenueGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <VenueGrid />
    </main>
  );
}