export default function OwnerStats() {
  const stats = [
    { label: "Venues Listed", value: "3", note: "2 premium venues", icon: "◈" },
    { label: "Active Bookings", value: "12", note: "4 pending approval", icon: "▣" },
    { label: "Monthly Revenue", value: "Rs 4.2L", note: "+18% from last month", icon: "▲" },
    { label: "Monthly Expenditure", value: "Rs 1.1L", note: "Maintenance and staff", icon: "▤" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_28px_rgba(30,18,10,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[#7A6050]">{stat.label}</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FDFAF6] text-lg">{stat.icon}</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#8A5C10]">{stat.value}</p>
          <p className="mt-2 text-xs text-[#7A6050]">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}
