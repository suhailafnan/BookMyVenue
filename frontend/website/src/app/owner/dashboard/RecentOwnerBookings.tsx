import EmptyState from "@/components/EmptyState";

type RecentOwnerBookingsProps = {
  bookings: Array<{
    id: string;
    venue: string;
    eventDateDisplay: string;
    payoutDisplay: string;
    status: string;
  }>;
};

export default function RecentOwnerBookings({ bookings }: RecentOwnerBookingsProps) {
  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Recent Bookings</h2>
        <p className="text-sm text-[#7A6050]">Latest real booking requests and confirmed bookings.</p>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 ? (
          <EmptyState title="No bookings yet" message="Recent bookings will appear after users submit real booking requests." />
        ) : null}
        {bookings.map((booking) => (
          <div key={booking.id} className="bmv-soft-card flex flex-wrap items-center justify-between gap-3 rounded-md p-3">
            <div>
              <p className="font-medium text-[#1E120A]">{booking.venue}</p>
              <p className="text-sm text-[#7A6050]">{booking.eventDateDisplay}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#A07020]">{booking.payoutDisplay}</p>
              <span className="bmv-badge bmv-badge-navy mt-1">{booking.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
