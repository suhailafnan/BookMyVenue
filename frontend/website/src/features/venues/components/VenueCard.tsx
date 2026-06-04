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
  <div className="bg-[#F5E6D3] border border-[#4A3425] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">

    <div className="h-48 bg-[#3D2B1F] flex items-center justify-center">
      <span className="text-[#F5E6D3]">
        Venue Image
      </span>
    </div>

    <div className="p-5">

      <h3 className="text-xl font-bold text-[#120A06] mb-2">
        {name}
      </h3>

      <p className="text-[#A87C5C] mb-2">
        📍 {location}
      </p>

      <p className="text-[#C8481A] font-bold text-lg mb-4">
        {price}
      </p>

      <button className="w-full bg-[#C8481A] hover:bg-[#B8691A] text-white py-2 rounded-lg transition">
        View Details
      </button>

    </div>

  </div>
);
}