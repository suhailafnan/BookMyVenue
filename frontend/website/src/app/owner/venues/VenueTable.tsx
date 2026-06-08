export default function VenueTable() {
  const venues = [
    { id: "1", name: "Grand Meridian Hall", capacity: 300, price: "Rs 1,02,000", revenue: "Rs 8.16L", expense: "Rs 1.35L", margin: "83%", status: "Premium" },
    { id: "2", name: "Ironwood Courtyard", capacity: 120, price: "Rs 50,400", revenue: "Rs 2.52L", expense: "Rs 72,000", margin: "71%", status: "Active" },
    { id: "3", name: "Sunset Banquet Studio", capacity: 90, price: "Rs 38,000", revenue: "Rs 1.52L", expense: "Rs 44,000", margin: "71%", status: "Needs Photos" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B49A] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <table className="w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
          <tr>
            <th className="p-3">◈ Venue Name</th>
            <th className="p-3">◉ Capacity</th>
            <th className="p-3">⬟ Price</th>
            <th className="p-3">▲ Monthly Revenue</th>
            <th className="p-3">▤ Expense</th>
            <th className="p-3">◆ Margin</th>
            <th className="p-3">◒ Status</th>
            <th className="p-3">◇ Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">◈ {venue.name}</td>
              <td className="p-3">{venue.capacity}</td>
              <td className="p-3 font-semibold text-[#A07020]">{venue.price}</td>
              <td className="p-3 font-semibold text-[#8A5C10]">{venue.revenue}</td>
              <td className="p-3 text-[#C8481A]">{venue.expense}</td>
              <td className="p-3">{venue.margin}</td>
              <td className="p-3">
                <span className="rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">✦ {venue.status}</span>
              </td>
              <td className="flex gap-2 p-3">
                <button className="rounded-md border border-[#B09878] px-3 py-1 text-[#B8691A]" type="button">
                  Edit Venue
                </button>
                <button className="rounded-md border border-[#C8B49A] px-3 py-1 text-[#C8481A]" type="button">
                  Delete Venue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
