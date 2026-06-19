export type Category = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type VenueMetadata = {
  capacity: number;
  location: string;
  address?: string;
  parking: boolean;
  ac: boolean;
  wifi: boolean;
  amenities?: string[];
  contactName?: string;
  contactPhone?: string;
  availableDates?: string[];
};

export type Venue = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  metadata: VenueMetadata;
  category: Category | string;
  createdAt?: string;
  updatedAt?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type InventoryMeta = {
  lowStockThreshold: number;
  lowStockCount: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    pagination?: Pagination;
    inventory?: InventoryMeta;
    warning?: string | null;
  };
};

export type VenueQuery = {
  search?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

export type PaginatedVenues = {
  data: Venue[];
  pagination: Pagination;
  inventory?: InventoryMeta;
};
