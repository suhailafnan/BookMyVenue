export default function BookingRequests() {
  const bookings = [
    { id: "B001", venue: "Grand Meridian Hall", user: "Aarav Sharma", date: "Jun 20, 2026", amount: "Rs 1,02,000", event: "Corporate Offsite", priority: "High" },
    { id: "B002", venue: "Ironwood Courtyard", user: "Maya Rao", date: "Jun 22, 2026", amount: "Rs 50,400", event: "Wedding Reception", priority: "Medium" },
    { id: "B003", venue: "Sunset Banquet Studio", user: "Dev Nair", date: "Jun 29, 2026", amount: "Rs 38,000", event: "Birthday Event", priority: "Low" },
  ];

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="grid gap-4 rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)] lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
          <div>
            <p className="font-medium text-[#1E120A]">◈ {booking.venue}</p>
            <p className="text-sm text-[#7A6050]">
              {booking.user} - {booking.event} - {booking.date}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-[#FDFAF6] p-3">
              <p className="text-[#7A6050]">⬟ Payout</p>
              <p className="font-semibold text-[#A07020]">{booking.amount}</p>
            </div>
            <div className="rounded-md bg-[#FDFAF6] p-3">
              <p className="text-[#7A6050]">◆ Priority</p>
              <p className="font-semibold text-[#1C2860]">{booking.priority}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md bg-[#C8481A] px-3 py-1 text-white" type="button">
              ✓ Accept
            </button>
            <button className="rounded-md border border-[#C8B49A] px-3 py-1 text-[#B8691A]" type="button">
              × Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
