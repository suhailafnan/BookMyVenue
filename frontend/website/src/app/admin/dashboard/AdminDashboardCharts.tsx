import EmptyState from "@/components/EmptyState";

type AdminDashboardChartsProps = {
  months: Array<{
    month: string;
    revenue: number;
    bookings: number;
    owners: number;
  }>;
};

export default function AdminDashboardCharts({ months }: AdminDashboardChartsProps) {
  const maxRevenue = Math.max(...months.map((item) => item.revenue), 1);
  const maxBookings = Math.max(...months.map((item) => item.bookings), 1);
  const maxOwners = Math.max(...months.map((item) => item.owners), 1);

  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Live Growth Graphs</h2>
        <p className="text-sm text-[#7A6050]">Graphs appear only after owners or bookings are registered.</p>
      </div>

      {months.length === 0 ? (
        <EmptyState title="No graph data yet" message="Register an owner or booking and the dashboard graph will start drawing from real records." />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#5A3E28]">Revenue in Lakhs</h3>
            <div className="bmv-soft-card flex h-44 items-end gap-3 rounded-lg border-b border-[#C8B49A] px-3 py-3">
              {months.map((item) => (
                <div key={`revenue-${item.month}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-8 rounded-t bg-[#C8481A] shadow-[0_6px_16px_rgba(200,72,26,0.18)]"
                    style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                    title={`Rs ${item.revenue}L`}
                  />
                  <span className="text-xs text-[#7A6050]">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#5A3E28]">Bookings</h3>
            <div className="bmv-soft-card flex h-44 items-end gap-3 rounded-lg border-b border-[#C8B49A] px-3 py-3">
              {months.map((item) => (
                <div key={`bookings-${item.month}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-8 rounded-t bg-[#1C2860] shadow-[0_6px_16px_rgba(28,40,96,0.18)]"
                    style={{ height: `${(item.bookings / maxBookings) * 100}%` }}
                    title={`${item.bookings} bookings`}
                  />
                  <span className="text-xs text-[#7A6050]">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#5A3E28]">Owners</h3>
            <div className="bmv-soft-card flex h-44 items-end gap-3 rounded-lg border-b border-[#C8B49A] px-3 py-3">
              {months.map((item) => (
                <div key={`owners-${item.month}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-8 rounded-t bg-[#B8691A] shadow-[0_6px_16px_rgba(184,105,26,0.18)]"
                    style={{ height: `${(item.owners / maxOwners) * 100}%` }}
                    title={`${item.owners} owners`}
                  />
                  <span className="text-xs text-[#7A6050]">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
