import VenueCard from "./VenueCard";
import { venues } from "../data/venues";

type VenueGridProps = {
  search: string;
};



export default function VenueGrid({
  search,
}: VenueGridProps) {
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {filteredVenues.map((venue, index) => (
        <VenueCard
          key={index}
          name={venue.name}
          location={venue.location}
          price={venue.price}
        />
      ))}
    </div>
  );
}