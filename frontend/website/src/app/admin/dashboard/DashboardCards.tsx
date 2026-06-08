export default function DashboardCards() {
  const cards = [
    { label: "Total Users", value: "1,240", note: "+62 this month", icon: "◉" },
    { label: "Total Owners", value: "86", note: "12 pending review", icon: "⬟" },
    { label: "Total Venues", value: "210", note: "38 premium venues", icon: "◈" },
    { label: "Total Bookings", value: "2,430", note: "176 active", icon: "▣" },
    { label: "Revenue", value: "Rs 92.8L", note: "+21% monthly", icon: "▲" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_28px_rgba(30,18,10,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[#7A6050]">{card.label}</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FDFAF6] text-lg">{card.icon}</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#8A5C10]">{card.value}</p>
          <p className="mt-2 text-xs text-[#7A6050]">{card.note}</p>
        </div>
      ))}
    </div>
  );
}
