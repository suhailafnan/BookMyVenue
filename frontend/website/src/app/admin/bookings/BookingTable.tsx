import EmptyState from "@/components/EmptyState";
import { getAdminBookings } from "@/lib/api";

export default async function BookingTable() {
  const bookings = await getAdminBookings();

  if (bookings.length === 0) {
    return <EmptyState title="No bookings registered" message="Admin booking rows will appear after users submit real bookings." />;
  }

  return (
    <div className="bmv-table-shell overflow-x-auto rounded-lg">
      <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] text-[#1E120A]">
          <tr>
            <th className="p-3">Booking ID</th>
            <th className="p-3">Venue</th>
            <th className="p-3">Owner</th>
            <th className="p-3">User</th>
            <th className="p-3">Payout</th>
            <th className="p-3">Commission</th>
            <th className="p-3">Dispute</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3">{booking.id}</td>
              <td className="p-3 font-medium text-[#1E120A]">{booking.venue}</td>
              <td className="p-3">{booking.owner}</td>
              <td className="p-3">{booking.user}</td>
              <td className="p-3 font-semibold text-[#A07020]">{booking.payoutDisplay}</td>
              <td className="p-3 text-[#8A5C10]">{booking.commissionDisplay}</td>
              <td className="p-3">{booking.disputeDisplay}</td>
              <td className="p-3">
                <span className="bmv-badge bmv-badge-navy">{booking.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
