export type Venue = {
  id: string;
  name: string;
  city: string;
  type: string;
  capacity: number;
  price: string;
  tag: string;
};

export const venues: Venue[] = [
  {
    id: "meridian-grand",
    name: "The Meridian Grand",
    city: "Kochi",
    type: "Wedding",
    capacity: 650,
    price: "INR 1.2L",
    tag: "Premium Hall",
  },
  {
    id: "palm-court",
    name: "Palm Court Banquets",
    city: "Thrissur",
    type: "Reception",
    capacity: 420,
    price: "INR 95k",
    tag: "Garden Venue",
  },
  {
    id: "lakeview-centre",
    name: "Lakeview Convention Centre",
    city: "Kochi",
    type: "Conference",
    capacity: 900,
    price: "INR 1.8L",
    tag: "Convention",
  },
  {
    id: "royal-orchid",
    name: "Royal Orchid Hall",
    city: "Calicut",
    type: "Birthday",
    capacity: 250,
    price: "INR 80k",
    tag: "Party Hall",
  },
];

const wishlistKey = "bookmyvenue.wishlist";
const defaultWishlistIds = ["meridian-grand", "lakeview-centre", "palm-court"];

export function getWishlistIds() {
  if (typeof window === "undefined") {
    return defaultWishlistIds;
  }

  const storedIds = window.localStorage.getItem(wishlistKey);

  if (!storedIds) {
    return defaultWishlistIds;
  }

  try {
    return JSON.parse(storedIds) as string[];
  } catch {
    return defaultWishlistIds;
  }
}

export function saveWishlistIds(ids: string[]) {
  window.localStorage.setItem(wishlistKey, JSON.stringify(ids));
  window.dispatchEvent(new Event("bookmyvenue:wishlist-updated"));
}

export function getWishlistVenues() {
  const ids = getWishlistIds();

  return venues.filter((venue) => ids.includes(venue.id));
}
