export default function OwnerDetailsTable() {
  const owners = [
    { name: "Anandhuu", venues: 3, bookings: 12, revenue: "Rs 4.2L", status: "Verified" },
    { name: "Maya Rao", venues: 6, bookings: 28, revenue: "Rs 9.8L", status: "Verified" },
    { name: "Rohan Mehta", venues: 2, bookings: 7, revenue: "Rs 2.1L", status: "Pending" },
    { name: "Sara Khan", venues: 4, bookings: 18, revenue: "Rs 6.4L", status: "Verified" },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">⬟ Owner Details</h2>
        <p className="text-sm text-[#7A6050]">All owners with listings, bookings, revenue, and approval status.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#5A3E28]">
          <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
            <tr>
              <th className="p-3">⬟ Owner</th>
              <th className="p-3">◈ Venues</th>
              <th className="p-3">▣ Bookings</th>
              <th className="p-3">▲ Revenue</th>
              <th className="p-3">◇ Status</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.name} className="border-b border-[#C8B49A] last:border-0">
                <td className="p-3 font-medium text-[#1E120A]">◉ {owner.name}</td>
                <td className="p-3">{owner.venues}</td>
                <td className="p-3">{owner.bookings}</td>
                <td className="p-3 font-semibold text-[#A07020]">{owner.revenue}</td>
                <td className="p-3">
                  <span className="rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">✓ {owner.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
