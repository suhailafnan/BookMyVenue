import OwnerStats from "./OwnerStats";
import ExpenditureList from "./ExpenditureList";
import MonthlyFinanceChart from "./MonthlyFinanceChart";
import OwnerProfileSummary from "./OwnerProfileSummary";
import RecentOwnerBookings from "./RecentOwnerBookings";
import VenueFinanceTable from "./VenueFinanceTable";
import VenuePerformanceCards from "./VenuePerformanceCards";

export default function OwnerDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <OwnerProfileSummary />
        <OwnerStats />
        <VenuePerformanceCards />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <VenueFinanceTable />
          <MonthlyFinanceChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ExpenditureList />
          <RecentOwnerBookings />
        </div>
      </div>
    </main>
  );
}
