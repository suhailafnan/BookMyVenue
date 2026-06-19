"use client";

import { useEffect, useMemo, useState } from "react";
import { getCategories, getVenues } from "@/services/api";
import type { Venue, VenueQuery } from "@/types/venue";
import { fallbackCategories, venues as fallbackVenues } from "@/features/venues/data/venues";

const fallbackFilter = (query: VenueQuery) =>
  fallbackVenues
    .filter((venue) => {
      const categoryName =
        typeof venue.category === "string" ? venue.category : venue.category.name;

      return (
        (!query.search ||
          venue.name.toLowerCase().includes(query.search.toLowerCase())) &&
        (!query.city || venue.metadata.location === query.city) &&
        (!query.category || categoryName === query.category)
      );
    })
    .sort((a, b) => {
      if (query.sort === "price:asc") return a.price - b.price;
      if (query.sort === "price:desc") return b.price - a.price;
      if (query.sort === "name:asc") return a.name.localeCompare(b.name);
      return 0;
    });

export function useVenues(query: VenueQuery) {
  const [venues, setVenues] = useState<Venue[]>(fallbackVenues);
  const [categories, setCategories] = useState(
    fallbackCategories.map((item) => item.name)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [venueResponse, categoryResponse] = await Promise.all([
          getVenues(query),
          getCategories(),
        ]);

        if (!isMounted) return;

        setVenues(venueResponse.data);
        setTotalPages(Math.max(venueResponse.pagination.pages || 1, 1));
        setCategories(categoryResponse.map((item) => item.name));
      } catch (error) {
        if (!isMounted) return;

        const filteredFallback = fallbackFilter(query);
        const limit = query.limit || 6;
        const page = query.page || 1;

        setError(error instanceof Error ? error.message : "Unable to load venues");
        setTotalPages(Math.max(Math.ceil(filteredFallback.length / limit), 1));
        setVenues(filteredFallback.slice((page - 1) * limit, page * limit));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [query]);

  const cities = useMemo(
    () => Array.from(new Set(fallbackVenues.map((venue) => venue.metadata.location))),
    []
  );

  return {
    venues,
    categories,
    cities,
    totalPages,
    isLoading,
    error,
  };
}
