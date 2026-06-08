export default function PlatformInsights() {
  const insights = [
    { label: "Pending Venue Approvals", value: "18", tone: "bg-[#3A5088]" },
    { label: "Open Support Tickets", value: "9", tone: "bg-[#B8691A]" },
    { label: "Refund Requests", value: "4", tone: "bg-[#C8481A]" },
    { label: "Average Booking Value", value: "Rs 41,200", tone: "bg-[#1C2860]" },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">◆ Important Details</h2>
        <p className="text-sm text-[#7A6050]">Items admins should monitor daily.</p>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-md bg-[#FDFAF6] p-3">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${item.tone}`} />
              <p className="text-sm font-medium text-[#1E120A]">{item.label}</p>
            </div>
            <p className="font-semibold text-[#8A5C10]">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
