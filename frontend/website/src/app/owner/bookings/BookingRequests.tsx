import EmptyState from "@/components/EmptyState";
import { getOwnerBookings } from "@/lib/api";

export default async function BookingRequests() {
  const bookings = await getOwnerBookings();

  if (bookings.length === 0) {
    return <EmptyState title="No booking requests" message="Accept and reject controls will appear after real booking requests arrive." />;
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bmv-card grid gap-4 rounded-lg p-4 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
          <div>
            <p className="font-medium text-[#1E120A]">{booking.venue}</p>
            <p className="text-sm text-[#7A6050]">
              {booking.user} - {booking.eventType} - {booking.eventDateDisplay}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bmv-soft-card rounded-md p-3">
              <p className="text-[#7A6050]">Payout</p>
              <p className="font-semibold text-[#A07020]">{booking.payoutDisplay}</p>
            </div>
            <div className="bmv-soft-card rounded-md p-3">
              <p className="text-[#7A6050]">Priority</p>
              <p className="font-semibold text-[#1C2860]">{booking.priority}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bmv-accent-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
              Accept
            </button>
            <button className="bmv-subtle-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
