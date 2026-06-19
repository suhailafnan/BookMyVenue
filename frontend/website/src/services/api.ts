import axios, { AxiosError } from "axios";
import type {
  ApiResponse,
  Category,
  PaginatedVenues,
  Venue,
  VenueQuery,
} from "@/types/venue";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to complete request";

    return Promise.reject(new Error(message));
  }
);

export const uploadUrl = (image?: string) => {
  if (!image) {
    return "/images/hero.jpg";
  }

  if (image.startsWith("http") || image.startsWith("/images")) {
    return image;
  }

  return `${API_URL}/uploads/${image.replace(/^\/uploads\//, "")}`;
};

const toParams = (query: VenueQuery = {}) => {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.minPrice !== undefined) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("maxPrice", String(query.maxPrice));
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  return params;
};

export async function getVenues(query: VenueQuery = {}): Promise<PaginatedVenues> {
  const response = await api.get<ApiResponse<Venue[]>>("/api/products", {
    params: toParams(query),
  });

  const venues = query.city
    ? response.data.data.filter(
        (venue) =>
          venue.metadata.location.toLowerCase() === query.city?.toLowerCase()
      )
    : response.data.data;

  return {
    data: venues,
    pagination:
      response.data.meta?.pagination || {
        page: query.page || 1,
        limit: query.limit || venues.length,
        total: venues.length,
        pages: 1,
      },
    inventory: response.data.meta?.inventory,
  };
}

export async function getVenue(id: string) {
  const response = await api.get<ApiResponse<Venue>>(`/api/products/${id}`);
  return response.data.data;
}

export async function getCategories() {
  const response = await api.get<ApiResponse<Category[]>>("/api/categories");
  return response.data.data;
}

export const venueApi = {
  getVenues,
  getVenue,
  getCategories,
};
