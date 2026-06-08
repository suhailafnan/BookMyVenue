export default function MonthlyFinanceChart() {
  const months = [
    { month: "Jan", revenue: 260, expense: 82 },
    { month: "Feb", revenue: 310, expense: 96 },
    { month: "Mar", revenue: 380, expense: 105 },
    { month: "Apr", revenue: 340, expense: 91 },
    { month: "May", revenue: 420, expense: 110 },
    { month: "Jun", revenue: 460, expense: 118 },
  ];
  const maxValue = Math.max(...months.flatMap((item) => [item.revenue, item.expense]));

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">▤ Monthly Finance</h2>
        <p className="text-sm text-[#7A6050]">Revenue vs expenditure in thousands.</p>
      </div>

      <div className="flex h-56 items-end gap-4 border-b border-[#C8B49A] px-2">
        {months.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-44 items-end gap-1">
              <div
                className="w-5 rounded-t bg-[#C8481A]"
                style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                title={`Revenue ${item.revenue}k`}
              />
              <div
                className="w-5 rounded-t bg-[#B8691A]"
                style={{ height: `${(item.expense / maxValue) * 100}%` }}
                title={`Expense ${item.expense}k`}
              />
            </div>
            <span className="text-xs text-[#7A6050]">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 text-xs text-[#7A6050]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#C8481A]" />
          Revenue
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#B8691A]" />
          Expenditure
        </span>
      </div>
    </section>
  );
}
