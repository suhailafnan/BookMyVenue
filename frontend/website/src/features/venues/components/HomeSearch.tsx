"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

type HomeSearchProps = {
  categories: string[];
  cities: string[];
};

export default function HomeSearch({ categories, cities }: HomeSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (city) params.set("city", city);

    router.push(`/venues${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const controlClass =
    "h-12 min-w-0 rounded-md border border-[#C8B49A] bg-white px-3 text-sm font-medium text-[#1E120A] outline-none transition placeholder:text-[#7A6050] focus:border-[#C8481A] focus:ring-2 focus:ring-[#C8481A]/15";

  return (
    <form
      onSubmit={submitSearch}
      className="grid gap-3 rounded-lg border border-[#C8B49A] bg-white p-3 shadow-xl sm:p-4 lg:grid-cols-[minmax(220px,1.3fr)_minmax(160px,0.8fr)_minmax(150px,0.8fr)_auto]"
    >
      <label className="relative block">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A07020]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search venues"
          placeholder="Search venues"
          className={`${controlClass} w-full pl-11`}
        />
      </label>

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        aria-label="Select category"
        className={`${controlClass} w-full`}
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="relative block">
        <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A07020]" />
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          aria-label="Select city"
          className={`${controlClass} w-full pl-11`}
        >
          <option value="">All cities</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C8481A] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#8A5C10] focus:outline-none focus:ring-2 focus:ring-[#C8481A]/30"
      >
        <FaSearch className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
