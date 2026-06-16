const { DEFAULT_OWNER_ID, db } = require("../data/store");

function formatINR(amount) {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    const value = Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `Rs ${value}L`;
  }

  return `Rs ${amount.toLocaleString("en-IN")}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function monthKey(date) {
  const parsed = new Date(`${date}T00:00:00`);
  return {
    key: `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}`,
    label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(parsed),
  };
}

function text(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function numberValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function stringList(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim());
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function ownerName(ownerId) {
  return db.owners.find((owner) => owner.id === ownerId)?.name || "Unregistered Owner";
}

function userName(userId) {
  return db.users.find((user) => user.id === userId)?.name || "Unregistered User";
}

function venueName(venueId) {
  return db.venues.find((venue) => venue.id === venueId)?.name || "Unknown Venue";
}

function ownerVenues(ownerId = DEFAULT_OWNER_ID) {
  return db.venues.filter((venue) => venue.ownerId === ownerId);
}

function margin(revenue, expenditure) {
  if (!revenue) {
    return "0%";
  }

  return `${Math.round(((revenue - expenditure) / revenue) * 100)}%`;
}

function activeBooking(status) {
  return ["Pending", "Accepted", "Confirmed", "Approved", "Review"].includes(status);
}

function approvedBooking(status) {
  return ["Accepted", "Confirmed", "Approved"].includes(status);
}

function mapVenue(venue) {
  return {
    ...venue,
    owner: ownerName(venue.ownerId),
    priceDisplay: formatINR(venue.price),
    monthlyRevenueDisplay: formatINR(venue.monthlyRevenue),
    monthlyExpenditureDisplay: formatINR(venue.monthlyExpenditure),
    profit: venue.monthlyRevenue - venue.monthlyExpenditure,
    profitDisplay: formatINR(venue.monthlyRevenue - venue.monthlyExpenditure),
    margin: margin(venue.monthlyRevenue, venue.monthlyExpenditure),
    occupancyDisplay: `${venue.occupancy}%`,
    revenuePotentialDisplay: `${formatINR(venue.revenuePotential)}/mo`,
  };
}

function mapBooking(booking) {
  return {
    ...booking,
    venue: venueName(booking.venueId),
    owner: ownerName(booking.ownerId),
    user: userName(booking.userId),
    eventDateDisplay: formatDate(booking.eventDate),
    payoutDisplay: formatINR(booking.payout),
    commissionDisplay: formatINR(booking.commission),
    disputeDisplay: booking.dispute ? "Yes" : "No",
  };
}

function ownerFinanceChart(ownerId) {
  const months = new Map();

  db.bookings
    .filter((booking) => booking.ownerId === ownerId)
    .forEach((booking) => {
      const month = monthKey(booking.eventDate);
      const record = months.get(month.key) || { month: month.label, revenue: 0, expense: 0, bookings: 0 };
      record.revenue += booking.payout;
      record.bookings += 1;
      months.set(month.key, record);
    });

  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, item]) => ({
      ...item,
      revenue: Math.round(item.revenue / 1000),
      expense: Math.round(item.expense / 1000),
    }));
}

function adminChartData() {
  const months = new Map();

  db.owners.forEach((owner) => {
    const month = monthKey(owner.createdAt);
    const record = months.get(month.key) || { month: month.label, revenue: 0, bookings: 0, owners: 0 };
    record.owners += 1;
    months.set(month.key, record);
  });

  db.bookings.forEach((booking) => {
    const month = monthKey(booking.eventDate);
    const record = months.get(month.key) || { month: month.label, revenue: 0, bookings: 0, owners: 0 };
    record.revenue += booking.payout;
    record.bookings += 1;
    months.set(month.key, record);
  });

  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, item]) => ({
      ...item,
      revenue: Math.round(item.revenue / 100000),
    }));
}

function createOwnerRegistration(payload) {
  const name = text(payload.name);
  const email = text(payload.email);

  if (!name || !email) {
    throw new Error("Owner name and email are required.");
  }

  const createdAt = text(payload.createdAt) || today();
  const userId = text(payload.userId) || `U${String(db.users.length + 1).padStart(3, "0")}`;
  const ownerId = text(payload.id) || (db.owners.length === 0 ? DEFAULT_OWNER_ID : `owner-${Date.now()}`);

  const user = {
    id: userId,
    name,
    role: "Owner",
    bookings: 0,
    bookingValue: 0,
    risk: "Low",
    status: "Review",
    createdAt,
  };

  const owner = {
    id: ownerId,
    userId,
    name,
    email,
    businessName: text(payload.businessName) || "Not added",
    verification: "Pending Review",
    gstStatus: text(payload.gstStatus) || "Not added",
    payoutAccount: text(payload.payoutAccount) || "Not added",
    rating: 0,
    status: "Review",
    createdAt,
  };

  db.users.push(user);
  db.owners.push(owner);

  return {
    ...owner,
    activeListings: 0,
  };
}

function getOwnerProfile(ownerId = DEFAULT_OWNER_ID) {
  const owner = db.owners.find((item) => item.id === ownerId);

  if (!owner) {
    return null;
  }

  return {
    ...owner,
    activeListings: ownerVenues(ownerId).length,
  };
}

function getOwnerDashboard(ownerId = DEFAULT_OWNER_ID) {
  const owner = getOwnerProfile(ownerId);

  if (!owner) {
    return null;
  }

  const venues = ownerVenues(ownerId).map(mapVenue);
  const bookings = db.bookings.filter((booking) => booking.ownerId === ownerId);
  const totalRevenue = venues.reduce((sum, venue) => sum + venue.monthlyRevenue, 0);
  const totalExpenditure = venues.reduce((sum, venue) => sum + venue.monthlyExpenditure, 0);
  const confirmedRevenue = bookings.filter((booking) => approvedBooking(booking.status)).reduce((sum, booking) => sum + booking.payout, 0);

  return {
    profile: owner,
    cards: [
      { label: "Total Venues", value: String(venues.length), note: "Registered under this owner", icon: "◈" },
      { label: "Pending Bookings", value: String(bookings.filter((booking) => booking.status === "Pending").length), note: "Waiting for owner action", icon: "▣" },
      { label: "Approved Bookings", value: String(bookings.filter((booking) => approvedBooking(booking.status)).length), note: "Accepted or confirmed", icon: "✓" },
      { label: "Revenue", value: formatINR(totalRevenue), note: "Calculated from venue records", icon: "▲" },
      { label: "Monthly Expenditure", value: formatINR(totalExpenditure), note: "Calculated from venue records", icon: "▤" },
    ],
    venues,
    performance: venues.map((venue) => ({
      id: venue.id,
      name: venue.name,
      occupancy: venue.occupancyDisplay,
      rating: venue.rating ? venue.rating.toFixed(1) : "New",
      lead: venue.lead,
      action: venue.nextAction,
    })),
    financeChart: ownerFinanceChart(ownerId),
    expenditures: db.expenditures.map((item) => ({ ...item, amountDisplay: formatINR(item.amount) })),
    recentBookings: bookings.filter((booking) => activeBooking(booking.status)).slice(-3).reverse().map(mapBooking),
    earnings: {
      confirmedRevenue,
      confirmedRevenueDisplay: formatINR(confirmedRevenue),
      operatingExpenditure: totalExpenditure,
      operatingExpenditureDisplay: formatINR(totalExpenditure),
      netProfit: totalRevenue - totalExpenditure,
      netProfitDisplay: formatINR(totalRevenue - totalExpenditure),
      pendingPayout: bookings.filter((booking) => booking.status === "Pending").reduce((sum, booking) => sum + booking.payout, 0),
      pendingPayoutDisplay: formatINR(bookings.filter((booking) => booking.status === "Pending").reduce((sum, booking) => sum + booking.payout, 0)),
    },
  };
}

function getOwnerVenues(ownerId = DEFAULT_OWNER_ID) {
  return ownerVenues(ownerId).map(mapVenue);
}

function getOwnerVenue(id, ownerId = DEFAULT_OWNER_ID) {
  const venue = db.venues.find((item) => item.id === id && item.ownerId === ownerId);
  return venue ? mapVenue(venue) : null;
}

function createOwnerVenue(payload, ownerId = DEFAULT_OWNER_ID) {
  if (!db.owners.some((owner) => owner.id === ownerId)) {
    throw new Error("Owner profile must be registered before adding venues.");
  }

  const name = text(payload.venueName) || text(payload.name);
  const capacity = numberValue(payload.capacity);
  const price = numberValue(payload.price);

  if (!name || !capacity || !price) {
    throw new Error("Venue name, capacity, and price are required.");
  }

  const venue = {
    id: `V${String(db.venues.length + 1).padStart(3, "0")}`,
    ownerId,
    name,
    description: text(payload.description) || "",
    capacity,
    price,
    amenities: stringList(payload.amenities),
    images: stringList(payload.images),
    location: text(payload.location) || "",
    monthlyRevenue: 0,
    monthlyExpenditure: 0,
    occupancy: 0,
    rating: 0,
    lead: "New listing",
    nextAction: "Complete listing details",
    qualityScore: 0,
    revenuePotential: price * 4,
    docs: "Pending",
    status: "Pending",
    createdAt: today(),
  };

  db.venues.push(venue);
  return mapVenue(venue);
}

function updateOwnerVenue(id, payload, ownerId = DEFAULT_OWNER_ID) {
  const venue = db.venues.find((item) => item.id === id && item.ownerId === ownerId);

  if (!venue) {
    return null;
  }

  venue.name = text(payload.venueName) || text(payload.name) || venue.name;
  venue.description = text(payload.description) || venue.description;
  venue.capacity = numberValue(payload.capacity) || venue.capacity;
  venue.price = numberValue(payload.price) || venue.price;
  venue.location = text(payload.location) || venue.location;
  venue.monthlyRevenue = numberValue(payload.monthlyRevenue) ?? venue.monthlyRevenue;
  venue.monthlyExpenditure = numberValue(payload.monthlyExpenditure) ?? venue.monthlyExpenditure;

  const amenities = stringList(payload.amenities);
  if (amenities.length) venue.amenities = amenities;

  const images = stringList(payload.images);
  if (images.length) venue.images = images;

  return mapVenue(venue);
}

function deleteOwnerVenue(id, ownerId = DEFAULT_OWNER_ID) {
  const index = db.venues.findIndex((venue) => venue.id === id && venue.ownerId === ownerId);

  if (index === -1) {
    return false;
  }

  db.venues.splice(index, 1);
  return true;
}

function getOwnerBookings(ownerId = DEFAULT_OWNER_ID) {
  return db.bookings.filter((booking) => booking.ownerId === ownerId).map(mapBooking);
}

function updateOwnerBookingStatus(id, nextStatus, ownerId = DEFAULT_OWNER_ID) {
  const booking = db.bookings.find((item) => item.id === id && item.ownerId === ownerId);

  if (!booking) {
    return null;
  }

  booking.status = nextStatus;
  return mapBooking(booking);
}

function getOwnerAvailability() {
  return {
    openDates: db.availability.openDates.map((item) => ({ ...item, displayDate: formatDate(item.date) })),
    blockedDates: db.availability.blockedDates.map((item) => ({ ...item, displayDate: formatDate(item.date) })),
    peakDates: db.availability.peakDates.map((item) => ({
      ...item,
      venue: item.venueId ? venueName(item.venueId) : undefined,
      displayDate: formatDate(item.date),
      upliftDisplay: item.uplift ? `+${item.uplift}%` : undefined,
    })),
  };
}

function updateOwnerAvailability(payload) {
  const openDate = text(payload.openDate);
  const blockedDate = text(payload.blockedDate);
  const peakDate = text(payload.peakDate);

  if (openDate) db.availability.openDates.push({ date: openDate });
  if (blockedDate) db.availability.blockedDates.push({ date: blockedDate });
  if (peakDate) {
    db.availability.peakDates.push({
      date: peakDate,
      venueId: text(payload.venueId),
      uplift: numberValue(payload.uplift),
    });
  }

  return getOwnerAvailability();
}

function getOwnerEarnings(ownerId = DEFAULT_OWNER_ID) {
  const dashboard = getOwnerDashboard(ownerId);

  if (!dashboard) {
    return null;
  }

  const maxProfit = Math.max(...dashboard.venues.map((venue) => venue.profit), 1);

  return {
    cards: [
      { label: "Confirmed Revenue", value: dashboard.earnings.confirmedRevenueDisplay, icon: "▲" },
      { label: "Operating Expenditure", value: dashboard.earnings.operatingExpenditureDisplay, icon: "▤" },
      { label: "Net Profit", value: dashboard.earnings.netProfitDisplay, icon: "◆" },
      { label: "Pending Payout", value: dashboard.earnings.pendingPayoutDisplay, icon: "◒" },
    ],
    profitSplit: dashboard.venues.map((venue) => ({
      id: venue.id,
      label: venue.name,
      value: venue.profitDisplay,
      width: `${Math.round((venue.profit / maxProfit) * 100)}%`,
    })),
  };
}

function getAdminDashboard() {
  const pendingApprovals = db.venues.filter((venue) => venue.status === "Pending" || venue.status === "Review").length;
  const disputes = db.bookings.filter((booking) => booking.dispute).length;
  const revenue = db.bookings.filter((booking) => approvedBooking(booking.status)).reduce((sum, booking) => sum + booking.payout, 0);
  const averageBookingValue = db.bookings.length ? Math.round(db.bookings.reduce((sum, booking) => sum + booking.payout, 0) / db.bookings.length) : 0;

  return {
    cards: [
      { label: "Total Users", value: db.users.length.toLocaleString("en-IN"), note: "Registered user accounts", icon: "◉" },
      { label: "Total Owners", value: String(db.owners.length), note: "Registered venue owners", icon: "⬟" },
      { label: "Total Venues", value: String(db.venues.length), note: `${pendingApprovals} pending review`, icon: "◈" },
      { label: "Total Bookings", value: db.bookings.length.toLocaleString("en-IN"), note: "Bookings in the system", icon: "▣" },
      { label: "Revenue", value: formatINR(revenue), note: "Approved booking revenue", icon: "▲" },
    ],
    owners: db.owners.map((owner) => {
      const venues = ownerVenues(owner.id);
      const bookings = db.bookings.filter((booking) => booking.ownerId === owner.id);
      const ownerRevenue = bookings.filter((booking) => approvedBooking(booking.status)).reduce((sum, booking) => sum + booking.payout, 0);
      const pendingBookings = bookings.filter((booking) => booking.status === "Pending").length;

      return {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        businessName: owner.businessName,
        verification: owner.verification,
        gstStatus: owner.gstStatus,
        payoutAccount: owner.payoutAccount,
        rating: owner.rating ? owner.rating.toFixed(1) : "New",
        venues: venues.length,
        bookings: bookings.length,
        pendingBookings,
        revenue: ownerRevenue,
        revenueDisplay: formatINR(ownerRevenue),
        status: owner.status,
        createdAtDisplay: formatDate(owner.createdAt),
      };
    }),
    insights: [
      { label: "Pending Venue Approvals", value: String(pendingApprovals), tone: "bg-[#3A5088]" },
      { label: "Registered Owners", value: String(db.owners.length), tone: "bg-[#B8691A]" },
      { label: "Disputes", value: String(disputes), tone: "bg-[#C8481A]" },
      { label: "Average Booking Value", value: formatINR(averageBookingValue), tone: "bg-[#1C2860]" },
    ],
    charts: adminChartData(),
    activities: [
      ...db.owners.slice(-3).map((owner) => ({ title: "Owner registered", detail: `${owner.name} created ${owner.businessName}.` })),
      ...db.venues.slice(-3).map((venue) => ({ title: "Venue added", detail: `${venue.name} is waiting for review.` })),
      ...db.activities,
    ].slice(-6),
  };
}

function getAdminUsers() {
  return db.users.map((user) => ({ ...user, valueDisplay: formatINR(user.bookingValue) }));
}

function updateAdminUserStatus(id, status) {
  const user = db.users.find((item) => item.id === id);
  if (!user) return null;
  user.status = status;
  return { ...user, valueDisplay: formatINR(user.bookingValue) };
}

function getAdminVenues() {
  return db.venues.map(mapVenue);
}

function updateAdminVenueStatus(id, status) {
  const venue = db.venues.find((item) => item.id === id);
  if (!venue) return null;
  venue.status = status;
  return mapVenue(venue);
}

function getAdminBookings() {
  return db.bookings.map(mapBooking);
}

function getAdminReports() {
  const dashboard = getAdminDashboard();

  return [
    { label: "Revenue", value: dashboard.cards[4].value, trend: "Live", owner: "Approved bookings" },
    { label: "Bookings", value: dashboard.cards[3].value, trend: "Live", owner: "All venues" },
    { label: "Users", value: dashboard.cards[0].value, trend: "Live", owner: "Registered users" },
    { label: "Venue Growth", value: dashboard.cards[2].value, trend: "Live", owner: "Submitted venues" },
    { label: "Platform Commission", value: formatINR(db.bookings.reduce((sum, booking) => sum + booking.commission, 0)), trend: "Live", owner: "All owners" },
    { label: "Dispute Rate", value: `${db.bookings.length ? Math.round((db.bookings.filter((booking) => booking.dispute).length / db.bookings.length) * 100) : 0}%`, trend: "Live", owner: "Support queue" },
  ];
}

function getAdminSettings() {
  return db.settings;
}

function updateAdminSetting(key, payload) {
  const setting = db.settings.find((item) => item.key === key);
  if (!setting) return null;

  const nextValue = text(payload.value);
  const nextNote = text(payload.note);
  if (nextValue) setting.value = nextValue;
  if (nextNote) setting.note = nextNote;
  return setting;
}

function updateAdminSettings(payload) {
  const items = Array.isArray(payload.settings) ? payload.settings : [];

  items.forEach((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return;
    if (typeof item.key === "string") updateAdminSetting(item.key, item);
  });

  return getAdminSettings();
}

module.exports = {
  createOwnerRegistration,
  createOwnerVenue,
  deleteOwnerVenue,
  getAdminBookings,
  getAdminDashboard,
  getAdminReports,
  getAdminSettings,
  getAdminUsers,
  getAdminVenues,
  getOwnerAvailability,
  getOwnerBookings,
  getOwnerDashboard,
  getOwnerEarnings,
  getOwnerProfile,
  getOwnerVenue,
  getOwnerVenues,
  updateAdminSetting,
  updateAdminSettings,
  updateAdminUserStatus,
  updateAdminVenueStatus,
  updateOwnerAvailability,
  updateOwnerBookingStatus,
  updateOwnerVenue,
};
