import BookingTable from "./BookingTable";

export const dynamic = "force-dynamic";

export default function AdminBookingsPage() {
  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">▣ Booking Oversight</h1>
          <p className="mt-1 text-sm text-[#7A6050]">All bookings with owner, payout, commission, dispute, and fulfillment state.</p>
        </div>
        <BookingTable />
      </div>
    </main>
  );
}
