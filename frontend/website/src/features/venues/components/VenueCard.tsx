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
  <div className="border rounded-xl p-4 shadow-md">
    <h3 className="text-xl font-bold">
      {name}
    </h3>

    <p>{location}</p>

    <p className="text-green-600 font-semibold">
      {price}
    </p>
  </div>
);
}