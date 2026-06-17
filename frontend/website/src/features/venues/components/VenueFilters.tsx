type VenueFiltersProps = {
  location: string;
  setLocation: (value: string) => void;
};

export default function VenueFilters({
  location,
  setLocation,
}: VenueFiltersProps) {
  return (
    <div className="p-6">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-[#4A3425] rounded-lg p-3 bg-white"
      >
        <option value="">All Locations</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
      </select>
    </div>
  );
}