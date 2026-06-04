type VenueCardProps = {
  name: string;
  location: string;
  price: string;
};

export default function VenueCard({
  name,
  location,
  price,
}: VenueCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{location}</p>
      <p>{price}</p>
    </div>
  );
}