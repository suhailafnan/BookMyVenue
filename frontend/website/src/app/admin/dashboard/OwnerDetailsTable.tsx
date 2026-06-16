import EmptyState from "@/components/EmptyState";

type OwnerDetailsTableProps = {
  owners: Array<{
    id: string;
    name: string;
    email: string;
    businessName: string;
    verification: string;
    gstStatus: string;
    payoutAccount: string;
    rating: string;
    venues: number;
    bookings: number;
    pendingBookings: number;
    revenueDisplay: string;
    status: string;
    createdAtDisplay: string;
  }>;
};

export default function OwnerDetailsTable({ owners }: OwnerDetailsTableProps) {
  return (
    <section className="bmv-table-shell rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Owner Details</h2>
        <p className="text-sm text-[#7A6050]">Registered owners with business, compliance, venue, booking, and payout details.</p>
      </div>

      {owners.length === 0 ? (
        <EmptyState title="No owners registered" message="Owner details will appear here after a real owner registration is created." />
      ) : (
        <div className="overflow-x-auto">
          <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
            <thead className="border-b border-[#C8B49A] text-[#1E120A]">
              <tr>
                <th className="p-3">Owner</th>
                <th className="p-3">Business</th>
                <th className="p-3">Compliance</th>
                <th className="p-3">Venues</th>
                <th className="p-3">Bookings</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id} className="border-b border-[#C8B49A] align-top last:border-0">
                  <td className="p-3">
                    <p className="font-medium text-[#1E120A]">{owner.name}</p>
                    <p className="mt-1 text-xs text-[#7A6050]">{owner.email}</p>
                    <p className="mt-1 text-xs text-[#7A6050]">Joined {owner.createdAtDisplay}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-[#1E120A]">{owner.businessName}</p>
                    <p className="mt-1 text-xs text-[#7A6050]">{owner.payoutAccount}</p>
                  </td>
                  <td className="p-3">
                    <p>{owner.verification}</p>
                    <p className="mt-1 text-xs text-[#7A6050]">GST: {owner.gstStatus}</p>
                  </td>
                  <td className="p-3">{owner.venues}</td>
                  <td className="p-3">
                    <p>{owner.bookings}</p>
                    <p className="mt-1 text-xs text-[#7A6050]">{owner.pendingBookings} pending</p>
                  </td>
                  <td className="p-3 font-semibold text-[#A07020]">{owner.revenueDisplay}</td>
                  <td className="p-3">{owner.rating}</td>
                  <td className="p-3">
                    <span className="bmv-badge bmv-badge-navy">{owner.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
