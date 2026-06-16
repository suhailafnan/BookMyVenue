const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type DashboardCard = {
  label: string;
  value: string;
  note: string;
  icon: string;
};

export type OwnerProfile = {
  id: string;
  userId: string;
  name: string;
  email: string;
  businessName: string;
  verification: string;
  gstStatus: string;
  payoutAccount: string;
  rating: number;
  status: string;
  createdAt: string;
  activeListings: number;
};

export type OwnerVenue = {
  id: string;
  name: string;
  capacity: number;
  qualityScore: number;
  docs: string;
  status: string;
  owner: string;
  priceDisplay: string;
  monthlyRevenueDisplay: string;
  monthlyExpenditureDisplay: string;
  profit: number;
  profitDisplay: string;
  margin: string;
  occupancyDisplay: string;
  revenuePotentialDisplay: string;
};

export type OwnerBooking = {
  id: string;
  venue: string;
  owner: string;
  user: string;
  eventType: string;
  eventDateDisplay: string;
  payoutDisplay: string;
  commissionDisplay: string;
  priority: string;
  disputeDisplay: string;
  status: string;
};

export type OwnerDashboard = {
  profile: OwnerProfile;
  cards: DashboardCard[];
  venues: OwnerVenue[];
  performance: Array<{
    id: string;
    name: string;
    occupancy: string;
    rating: string;
    lead: string;
    action: string;
  }>;
  financeChart: Array<{
    month: string;
    revenue: number;
    expense: number;
  }>;
  expenditures: Array<{
    label: string;
    amountDisplay: string;
    note: string;
  }>;
  recentBookings: OwnerBooking[];
};

export type OwnerAvailability = {
  openDates: Array<{ date: string; displayDate: string }>;
  blockedDates: Array<{ date: string; displayDate: string }>;
  peakDates: Array<{
    date: string;
    venue?: string;
    displayDate: string;
    upliftDisplay?: string;
  }>;
};

export type OwnerEarnings = {
  cards: Array<{ label: string; value: string; icon: string }>;
  profitSplit: Array<{ id: string; label: string; value: string; width: string }>;
};

export type AdminOwner = {
  id: string;
  name: string;
  email: string;
  businessName: string;
  verification: string;
  gstStatus: string;
  payoutAccount: string;
  rating: string;
  venues: number;
  bookings: number;
  pendingBookings: number;
  revenueDisplay: string;
  status: string;
  createdAtDisplay: string;
};

export type AdminDashboard = {
  cards: DashboardCard[];
  owners: AdminOwner[];
  insights: Array<{ label: string; value: string; tone: string }>;
  charts: Array<{ month: string; revenue: number; bookings: number; owners: number }>;
  activities: Array<{ title: string; detail: string }>;
};

export type AdminUser = {
  id: string;
  name: string;
  role: string;
  bookings: number;
  valueDisplay: string;
  risk: string;
  status: string;
};

export type AdminReport = {
  label: string;
  value: string;
  trend: string;
  owner: string;
};

export type AdminSetting = {
  key: string;
  label: string;
  value: string;
  note: string;
};

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });

    if (!response.ok) {
      return fallback;
    }

    const json = (await response.json()) as ApiResponse<T>;
    return json.success && json.data !== undefined ? json.data : fallback;
  } catch {
    return fallback;
  }
}

export function getAdminDashboard() {
  return getJson<AdminDashboard>("/api/admin/dashboard", {
    cards: [
      { label: "Total Users", value: "0", note: "Registered user accounts", icon: "◉" },
      { label: "Total Owners", value: "0", note: "Registered venue owners", icon: "⬟" },
      { label: "Total Venues", value: "0", note: "0 pending review", icon: "◈" },
      { label: "Total Bookings", value: "0", note: "Bookings in the system", icon: "▣" },
      { label: "Revenue", value: "Rs 0", note: "Approved booking revenue", icon: "▲" },
    ],
    owners: [],
    insights: [
      { label: "Pending Venue Approvals", value: "0", tone: "bg-[#3A5088]" },
      { label: "Registered Owners", value: "0", tone: "bg-[#B8691A]" },
      { label: "Disputes", value: "0", tone: "bg-[#C8481A]" },
      { label: "Average Booking Value", value: "Rs 0", tone: "bg-[#1C2860]" },
    ],
    charts: [],
    activities: [],
  });
}

export function getAdminUsers() {
  return getJson<AdminUser[]>("/api/admin/users", []);
}

export function getAdminVenues() {
  return getJson<OwnerVenue[]>("/api/admin/venues", []);
}

export function getAdminBookings() {
  return getJson<OwnerBooking[]>("/api/admin/bookings", []);
}

export function getAdminReports() {
  return getJson<AdminReport[]>("/api/admin/reports", []);
}

export function getAdminSettings() {
  return getJson<AdminSetting[]>("/api/admin/settings", []);
}

export function getOwnerDashboard() {
  return getJson<OwnerDashboard | null>("/api/owner/dashboard", null);
}

export function getOwnerProfile() {
  return getJson<OwnerProfile | null>("/api/owner/profile", null);
}

export function getOwnerVenues() {
  return getJson<OwnerVenue[]>("/api/owner/venues", []);
}

export function getOwnerBookings() {
  return getJson<OwnerBooking[]>("/api/owner/bookings", []);
}

export function getOwnerAvailability() {
  return getJson<OwnerAvailability>("/api/owner/availability", {
    openDates: [],
    blockedDates: [],
    peakDates: [],
  });
}

export function getOwnerEarnings() {
  return getJson<OwnerEarnings | null>("/api/owner/earnings", null);
}
