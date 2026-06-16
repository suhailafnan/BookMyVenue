import EmptyState from "@/components/EmptyState";
import { getAdminVenues } from "@/lib/api";

export default async function VenueApprovalTable() {
  const venues = await getAdminVenues();

  if (venues.length === 0) {
    return <EmptyState title="No venues submitted" message="Venue approval rows will appear after owners add venues." />;
  }

  return (
    <div className="bmv-table-shell overflow-x-auto rounded-lg">
      <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] text-[#1E120A]">
          <tr>
            <th className="p-3">Venue</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Quality Score</th>
            <th className="p-3">Revenue Potential</th>
            <th className="p-3">Documents</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">{venue.name}</td>
              <td className="p-3">{venue.owner}</td>
              <td className="p-3 font-semibold text-[#8A5C10]">{venue.qualityScore}</td>
              <td className="p-3 font-semibold text-[#A07020]">{venue.revenuePotentialDisplay}</td>
              <td className="p-3">{venue.docs}</td>
              <td className="p-3">
                <span className="bmv-badge bmv-badge-navy">{venue.status}</span>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button className="bmv-accent-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Approve Venue
                  </button>
                  <button className="bmv-subtle-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Reject Venue
                  </button>
                  <button className="bmv-outline-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Suspend Venue
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
