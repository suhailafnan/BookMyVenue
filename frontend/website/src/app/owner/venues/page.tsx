import Link from "next/link";
import VenueTable from "./VenueTable";

export default function OwnerVenuesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◈ Venue Management</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Track pricing, margin, occupancy, and listing health for every venue.</p>
        </div>
        <Link className="rounded-md bg-[#C8481A] px-4 py-2 text-white" href="/owner/venues/add">
          + Add Venue
        </Link>
      </div>
      <VenueTable />
      </div>
    </main>
  );
}
