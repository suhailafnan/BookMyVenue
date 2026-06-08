export default function VenueApprovalTable() {
  const venues = [
    { id: "V001", name: "Grand Meridian Hall", owner: "Maya Rao", score: "94", potential: "Rs 8L/mo", docs: "Complete", status: "Approved" },
    { id: "V002", name: "Garden View", owner: "Rohan Mehta", score: "72", potential: "Rs 2L/mo", docs: "Pending GST", status: "Pending" },
    { id: "V003", name: "The Atrium Loft", owner: "Sara Khan", score: "88", potential: "Rs 5L/mo", docs: "Complete", status: "Review" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B49A] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <table className="w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
          <tr>
            <th className="p-3">◈ Venue</th>
            <th className="p-3">◉ Owner</th>
            <th className="p-3">✦ Quality Score</th>
            <th className="p-3">▲ Revenue Potential</th>
            <th className="p-3">▤ Documents</th>
            <th className="p-3">◒ Status</th>
            <th className="p-3">◇ Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">◈ {venue.name}</td>
              <td className="p-3">{venue.owner}</td>
              <td className="p-3 font-semibold text-[#8A5C10]">{venue.score}</td>
              <td className="p-3 font-semibold text-[#A07020]">{venue.potential}</td>
              <td className="p-3">{venue.docs}</td>
              <td className="p-3">
                <span className="rounded-full bg-[#3A5088] px-2 py-1 text-xs text-white">◇ {venue.status}</span>
              </td>
              <td className="flex gap-2 p-3">
                <button className="rounded-md bg-[#C8481A] px-3 py-1 text-white" type="button">
                  ✓ Approve Venue
                </button>
                <button className="rounded-md border border-[#C8B49A] px-3 py-1 text-[#B8691A]" type="button">
                  × Reject Venue
                </button>
                <button className="rounded-md border border-[#B09878] px-3 py-1 text-[#1C2860]" type="button">
                  – Suspend Venue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
