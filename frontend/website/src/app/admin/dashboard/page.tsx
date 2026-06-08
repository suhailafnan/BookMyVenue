import AdminActivityFeed from "./AdminActivityFeed";
import AdminDashboardCharts from "./AdminDashboardCharts";
import DashboardCards from "./DashboardCards";
import OwnerDetailsTable from "./OwnerDetailsTable";
import PlatformInsights from "./PlatformInsights";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◆ Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Platform-wide owners, venues, bookings, revenue, and moderation.</p>
        </div>

        <DashboardCards />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <OwnerDetailsTable />
          <PlatformInsights />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <AdminDashboardCharts />
          <AdminActivityFeed />
        </div>
      </div>
    </main>
  );
}
