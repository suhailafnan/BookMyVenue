import EmptyState from "@/components/EmptyState";
import { getOwnerVenues } from "@/lib/api";

export default async function VenueTable() {
  const venues = await getOwnerVenues();

  if (venues.length === 0) {
    return <EmptyState title="No venues added" message="Your venue list will appear here after you create a real venue." />;
  }

  return (
    <div className="bmv-table-shell overflow-x-auto rounded-lg">
      <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] text-[#1E120A]">
          <tr>
            <th className="p-3">Venue Name</th>
            <th className="p-3">Capacity</th>
            <th className="p-3">Price</th>
            <th className="p-3">Monthly Revenue</th>
            <th className="p-3">Expense</th>
            <th className="p-3">Margin</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">{venue.name}</td>
              <td className="p-3">{venue.capacity}</td>
              <td className="p-3 font-semibold text-[#A07020]">{venue.priceDisplay}</td>
              <td className="p-3 font-semibold text-[#8A5C10]">{venue.monthlyRevenueDisplay}</td>
              <td className="p-3 text-[#C8481A]">{venue.monthlyExpenditureDisplay}</td>
              <td className="p-3">{venue.margin}</td>
              <td className="p-3">
                <span className="bmv-badge bmv-badge-navy">{venue.status}</span>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button className="bmv-outline-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Edit Venue
                  </button>
                  <button className="bmv-subtle-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Delete Venue
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
