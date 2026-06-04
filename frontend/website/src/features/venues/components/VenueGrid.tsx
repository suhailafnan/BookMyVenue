import VenueCard from "./VenueCard";

const venues = [
  {
    name: "Royal Hall",
    location: "Coimbatore",
    price: "₹5000",
  },
  {
    name: "Grand Palace",
    location: "Chennai",
    price: "₹8000",
  },
  {
    name: "Conference Center",
    location: "Bangalore",
    price: "₹12000",
  },
];

export default function VenueGrid() {
  return (
    <div>
      {venues.map((venue, index) => (
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