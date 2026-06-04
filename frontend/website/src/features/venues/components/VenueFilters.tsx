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
        className="border rounded-lg p-3"
      >
        <option value="">All Locations</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
      </select>
    </div>
  );
}