export default function VenueFinanceTable() {
  const venues = [
    {
      name: "Grand Meridian Hall",
      bookings: 8,
      pricePerBooking: "Rs 1,02,000",
      monthlyRevenue: "Rs 8.16L",
      expenditure: "Rs 1.35L",
      profit: "Rs 6.81L",
    },
    {
      name: "Ironwood Courtyard",
      bookings: 5,
      pricePerBooking: "Rs 50,400",
      monthlyRevenue: "Rs 2.52L",
      expenditure: "Rs 72,000",
      profit: "Rs 1.80L",
    },
    {
      name: "Sunset Banquet Studio",
      bookings: 4,
      pricePerBooking: "Rs 38,000",
      monthlyRevenue: "Rs 1.52L",
      expenditure: "Rs 44,000",
      profit: "Rs 1.08L",
    },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">⬟ Venue Details</h2>
        <p className="text-sm text-[#7A6050]">Monthly pricing, revenue, expenditure, and profit per venue.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#5A3E28]">
          <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
            <tr>
              <th className="p-3">◈ Venue</th>
              <th className="p-3">▣ Bookings</th>
              <th className="p-3">⬟ Price</th>
              <th className="p-3">▲ Revenue</th>
              <th className="p-3">▤ Expense</th>
              <th className="p-3">◆ Profit</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.name} className="border-b border-[#C8B49A] last:border-0">
                <td className="p-3 font-medium text-[#1E120A]">◈ {venue.name}</td>
                <td className="p-3">{venue.bookings}</td>
                <td className="p-3 text-[#A07020]">{venue.pricePerBooking}</td>
                <td className="p-3 text-[#8A5C10]">{venue.monthlyRevenue}</td>
                <td className="p-3 text-[#C8481A]">{venue.expenditure}</td>
                <td className="p-3 font-semibold text-[#8A5C10]">{venue.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
