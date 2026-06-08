export default function EarningsCard() {
  const rows = [
    { label: "Confirmed Revenue", value: "Rs 12.2L", icon: "▲" },
    { label: "Operating Expenditure", value: "Rs 2.51L", icon: "▤" },
    { label: "Net Profit", value: "Rs 9.69L", icon: "◆" },
    { label: "Pending Payout", value: "Rs 1.34L", icon: "◒" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
            <p className="text-sm text-[#7A6050]">{row.icon} {row.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#A07020]">{row.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
        <h2 className="text-lg font-semibold text-[#1E120A]">◆ Venue Profit Split</h2>
        <div className="mt-4 space-y-4">
          {[
            { label: "Grand Meridian Hall", value: "Rs 6.81L", width: "88%" },
            { label: "Ironwood Courtyard", value: "Rs 1.80L", width: "52%" },
            { label: "Sunset Banquet Studio", value: "Rs 1.08L", width: "34%" },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#5A3E28]">{item.label}</span>
                <span className="font-semibold text-[#8A5C10]">{item.value}</span>
              </div>
              <div className="h-3 rounded-full bg-[#FDFAF6]">
                <div className="h-3 rounded-full bg-[#C8481A]" style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
