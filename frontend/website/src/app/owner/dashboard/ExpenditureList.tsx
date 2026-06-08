export default function ExpenditureList() {
  const expenditures = [
    { label: "Venue Maintenance", amount: "Rs 42,000", note: "Repairs, cleaning, decor refresh" },
    { label: "Staff Payments", amount: "Rs 36,000", note: "Event support and security" },
    { label: "Utilities", amount: "Rs 18,500", note: "Electricity, water, internet" },
    { label: "Marketing", amount: "Rs 13,500", note: "Promotions and listing boosts" },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">▤ Monthly Expenditure</h2>
        <p className="text-sm text-[#7A6050]">Cost categories for the current month.</p>
      </div>

      <div className="space-y-3">
        {expenditures.map((item) => (
          <div key={item.label} className="rounded-md bg-[#FDFAF6] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-[#1E120A]">◆ {item.label}</p>
              <p className="font-semibold text-[#C8481A]">{item.amount}</p>
            </div>
            <p className="mt-1 text-sm text-[#7A6050]">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
