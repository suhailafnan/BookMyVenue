import EmptyState from "@/components/EmptyState";

type MonthlyFinanceChartProps = {
  months: Array<{
    month: string;
    revenue: number;
    expense: number;
  }>;
};

export default function MonthlyFinanceChart({ months }: MonthlyFinanceChartProps) {
  const maxValue = Math.max(...months.flatMap((item) => [item.revenue, item.expense]), 1);

  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Monthly Finance</h2>
        <p className="text-sm text-[#7A6050]">Generated only from registered bookings.</p>
      </div>

      {months.length === 0 ? (
        <EmptyState title="No graph data yet" message="The finance graph will appear after real bookings are registered." />
      ) : (
        <>
          <div className="bmv-soft-card flex h-56 items-end gap-4 rounded-lg border-b border-[#C8B49A] px-3 py-3">
            {months.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 items-end gap-1">
                  <div
                    className="w-5 rounded-t bg-[#C8481A] shadow-[0_6px_16px_rgba(200,72,26,0.18)]"
                    style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                    title={`Revenue ${item.revenue}k`}
                  />
                  <div
                    className="w-5 rounded-t bg-[#B8691A] shadow-[0_6px_16px_rgba(184,105,26,0.16)]"
                    style={{ height: `${(item.expense / maxValue) * 100}%` }}
                    title={`Expense ${item.expense}k`}
                  />
                </div>
                <span className="text-xs text-[#7A6050]">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#7A6050]">
            <span className="bmv-soft-card flex items-center gap-2 rounded-full px-3 py-2">
              <span className="h-3 w-3 rounded-sm bg-[#C8481A]" />
              Revenue
            </span>
            <span className="bmv-soft-card flex items-center gap-2 rounded-full px-3 py-2">
              <span className="h-3 w-3 rounded-sm bg-[#B8691A]" />
              Expenditure
            </span>
          </div>
        </>
      )}
    </section>
  );
}
