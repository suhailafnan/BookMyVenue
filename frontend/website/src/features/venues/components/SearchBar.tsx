type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
  <div className="p-6">
    <input
      type="text"
      placeholder="Search venues..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-[#4A3425] rounded-lg p-4 bg-white"
    />
  </div>
);
}