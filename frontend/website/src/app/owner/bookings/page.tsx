import BookingRequests from "./BookingRequests";

export const dynamic = "force-dynamic";

export default function OwnerBookingsPage() {
  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">▣ Booking Control</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Prioritize requests by payout, date, venue load, and customer risk.</p>
        </div>
        <BookingRequests />
      </div>
    </main>
  );
}
