export default function BookingTable() {
  const bookings = [
    { id: "B001", venue: "Grand Meridian Hall", owner: "Maya Rao", user: "Aarav Sharma", payout: "Rs 1,02,000", commission: "Rs 10,200", dispute: "No", status: "Approved" },
    { id: "B002", venue: "Garden View", owner: "Rohan Mehta", user: "Maya Rao", payout: "Rs 50,400", commission: "Rs 5,040", dispute: "No", status: "Pending" },
    { id: "B003", venue: "The Atrium Loft", owner: "Sara Khan", user: "Dev Nair", payout: "Rs 72,000", commission: "Rs 7,200", dispute: "Yes", status: "Review" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B49A] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <table className="w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
          <tr>
            <th className="p-3">▣ Booking ID</th>
            <th className="p-3">◈ Venue</th>
            <th className="p-3">◉ Owner</th>
            <th className="p-3">◇ User</th>
            <th className="p-3">▲ Payout</th>
            <th className="p-3">⬟ Commission</th>
            <th className="p-3">◆ Dispute</th>
            <th className="p-3">◒ Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3">{booking.id}</td>
              <td className="p-3 font-medium text-[#1E120A]">◈ {booking.venue}</td>
              <td className="p-3">{booking.owner}</td>
              <td className="p-3">{booking.user}</td>
              <td className="p-3 font-semibold text-[#A07020]">{booking.payout}</td>
              <td className="p-3 text-[#8A5C10]">{booking.commission}</td>
              <td className="p-3">{booking.dispute}</td>
              <td className="p-3">
                <span className="rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">✦ {booking.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
