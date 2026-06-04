import VenueCard from "./VenueCard";
import { venues } from "../data/venues";

type VenueGridProps = {
  search: string;
  location: string;
   page: number;
};

export default function VenueGrid({
  search,
  location,
  page,
}: VenueGridProps) {
  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "" || venue.location === location;

    return matchesSearch && matchesLocation;
    
  });
    const venuesPerPage = 4;
    const totalPages = Math.ceil(
  filteredVenues.length / venuesPerPage
);

const startIndex = (page - 1) * venuesPerPage;

const paginatedVenues = filteredVenues.slice(
  startIndex,
  startIndex + venuesPerPage
);

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {paginatedVenues.map((venue) => (
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