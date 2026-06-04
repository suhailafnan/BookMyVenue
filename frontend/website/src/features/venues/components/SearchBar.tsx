"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search venues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>You typed: {search}</p>
    </div>
  );
}