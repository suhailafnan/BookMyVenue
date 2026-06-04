import VenueCard from "./VenueCard";
import { venues } from "../data/venues";

type VenueGridProps = {
  search: string;
  location: string;
};

export default function VenueGrid({
  search,
  location,
}: VenueGridProps) {
  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "" || venue.location === location;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {filteredVenues.map((venue) => (
        <VenueCard
          key={venue.id}
          name={venue.name}
          location={venue.location}
          price={venue.price}
        />
      ))}
    </div>
  );
}