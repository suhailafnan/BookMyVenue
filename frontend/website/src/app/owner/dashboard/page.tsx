import EmptyState from "@/components/EmptyState";
import { getOwnerDashboard } from "@/lib/api";
import OwnerStats from "./OwnerStats";
import ExpenditureList from "./ExpenditureList";
import MonthlyFinanceChart from "./MonthlyFinanceChart";
import OwnerProfileSummary from "./OwnerProfileSummary";
import RecentOwnerBookings from "./RecentOwnerBookings";
import VenueFinanceTable from "./VenueFinanceTable";
import VenuePerformanceCards from "./VenuePerformanceCards";

export const dynamic = "force-dynamic";

export default async function OwnerDashboardPage() {
  const dashboard = await getOwnerDashboard();

  if (!dashboard) {
    return (
      <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
        <div className="mx-auto max-w-7xl">
          <EmptyState
            title="No owner profile registered"
            message="The dashboard will stay empty until an owner account is registered through the backend."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="bmv-hero-card rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Owner Console</p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">Business overview</h1>
          <p className="mt-2 max-w-3xl text-sm text-[#7A6050]">Track venue performance, revenue flow, expenditure pressure, and the bookings that need your attention.</p>
        </section>

        <OwnerProfileSummary profile={dashboard.profile} />
        <OwnerStats stats={dashboard.cards} />
        <VenuePerformanceCards venues={dashboard.performance} />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <VenueFinanceTable venues={dashboard.venues} />
          <MonthlyFinanceChart months={dashboard.financeChart} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ExpenditureList expenditures={dashboard.expenditures} />
          <RecentOwnerBookings bookings={dashboard.recentBookings} />
        </div>
      </div>
    </main>
  );
}
