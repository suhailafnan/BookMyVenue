const DEFAULT_OWNER_ID = "owner-current";

const db = {
  owners: [
    {
      id: DEFAULT_OWNER_ID,
      userId: "U001",
      name: "Anandhu P.",
      email: "anandhu@example.com",
      businessName: "Anandhu Venue Studio",
      verification: "Demo Verified Host",
      gstStatus: "Not added",
      payoutAccount: "Not connected",
      rating: 0,
      status: "Review",
      createdAt: "2026-06-15",
    },
  ],
  users: [
    {
      id: "U001",
      name: "Anandhu P.",
      role: "Owner",
      bookings: 0,
      bookingValue: 0,
      risk: "Low",
      status: "Review",
      createdAt: "2026-06-15",
    },
  ],
  venues: [],
  bookings: [],
  financeMonths: [],
  expenditures: [],
  settings: [
    { key: "ownerAutoApproval", label: "Owner Auto-Approval", value: "Disabled", note: "Manual approval keeps venue quality high." },
    { key: "platformCommission", label: "Platform Commission", value: "10%", note: "Applied after successful booking completion." },
    { key: "payoutHold", label: "Payout Hold", value: "48 hours", note: "Protects users during event confirmation." },
    { key: "disputeEscalation", label: "Dispute Escalation", value: "24 hours", note: "High-value disputes move to admin review." },
  ],
  activities: [],
  reports: [],
  availability: {
    openDates: [],
    blockedDates: [],
    peakDates: [],
  },
};

module.exports = {
  DEFAULT_OWNER_ID,
  db,
};
