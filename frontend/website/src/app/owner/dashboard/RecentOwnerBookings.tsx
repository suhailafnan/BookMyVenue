export default function RecentOwnerBookings() {
  const bookings = [
    { id: "B-1208", venue: "Grand Meridian Hall", date: "Jun 14, 2026", amount: "Rs 1,02,000", status: "Confirmed" },
    { id: "B-1211", venue: "Ironwood Courtyard", date: "Jun 20, 2026", amount: "Rs 50,400", status: "Pending" },
    { id: "B-1219", venue: "Sunset Banquet Studio", date: "Jun 24, 2026", amount: "Rs 38,000", status: "Confirmed" },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">▣ Recent Bookings</h2>
        <p className="text-sm text-[#7A6050]">Latest requests and confirmed venue bookings.</p>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#FDFAF6] p-3">
            <div>
              <p className="font-medium text-[#1E120A]">◈ {booking.venue}</p>
              <p className="text-sm text-[#7A6050]">{booking.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#A07020]">{booking.amount}</p>
              <span className="mt-1 inline-block rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">
                ✓ {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
