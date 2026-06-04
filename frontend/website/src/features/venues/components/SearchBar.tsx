type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search venues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}