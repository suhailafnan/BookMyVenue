import ReportsTable from "./ReportsTable";

export const dynamic = "force-dynamic";

export default function AdminReportsPage() {
  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">▤ Platform Reports</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Revenue, bookings, users, venue growth, commission, and risk signals.</p>
        </div>
        <ReportsTable />
      </div>
    </main>
  );
}
