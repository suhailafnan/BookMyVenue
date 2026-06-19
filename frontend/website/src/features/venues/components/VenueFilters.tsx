type VenueFiltersProps = {
  city: string;
  category: string;
  sort: string;
  cities: string[];
  categories: string[];
  setCity: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
};

export default function VenueFilters({
  city,
  category,
  sort,
  cities,
  categories,
  setCity,
  setCategory,
  setSort,
}: VenueFiltersProps) {
  const selectClass =
    "h-12 rounded-md border border-[#C8B49A] bg-white px-3 text-sm font-medium text-[#1E120A] outline-none transition focus:border-[#C8481A]";

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <select
        value={city}
        onChange={(event) => setCity(event.target.value)}
        className={selectClass}
      >
        <option value="">All cities</option>
        {cities.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className={selectClass}
      >
        <option value="">All categories</option>
        {categories.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        className={selectClass}
      >
        <option value="createdAt:desc">Newest first</option>
        <option value="price:asc">Price low to high</option>
        <option value="price:desc">Price high to low</option>
        <option value="name:asc">Name A to Z</option>
      </select>
    </div>
  );
}
