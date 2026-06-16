import { getAdminDashboard } from "@/lib/api";
import AdminActivityFeed from "./AdminActivityFeed";
import AdminDashboardCharts from "./AdminDashboardCharts";
import DashboardCards from "./DashboardCards";
import OwnerDetailsTable from "./OwnerDetailsTable";
import PlatformInsights from "./PlatformInsights";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const dashboard = await getAdminDashboard();

  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="bmv-hero-card rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Admin Console</p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">Operations overview</h1>
          <p className="mt-2 max-w-3xl text-sm text-[#7A6050]">Monitor owners, venue health, booking throughput, and platform revenue from one warmer command surface.</p>
        </section>

        <DashboardCards cards={dashboard.cards} />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <OwnerDetailsTable owners={dashboard.owners} />
          <PlatformInsights insights={dashboard.insights} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <AdminDashboardCharts months={dashboard.charts} />
          <AdminActivityFeed activities={dashboard.activities} />
        </div>
      </div>
    </main>
  );
}
