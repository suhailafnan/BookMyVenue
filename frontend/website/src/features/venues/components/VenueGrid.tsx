import VenueCard from "./VenueCard";

export default function VenueGrid() {
  return (
    <div>
      <VenueCard
        name="Royal Hall"
        location="Coimbatore"
        price="₹5000"
      />

      <VenueCard
        name="Grand Palace"
        location="Chennai"
        price="₹8000"
      />

      <VenueCard
        name="Conference Center"
        location="Bangalore"
        price="₹12000"
      />
    </div>
  );
}