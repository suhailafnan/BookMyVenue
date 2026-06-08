export default function AdminDashboardCharts() {
  const months = [
    { month: "Jan", revenue: 52, bookings: 180 },
    { month: "Feb", revenue: 61, bookings: 220 },
    { month: "Mar", revenue: 69, bookings: 260 },
    { month: "Apr", revenue: 73, bookings: 290 },
    { month: "May", revenue: 86, bookings: 340 },
    { month: "Jun", revenue: 93, bookings: 380 },
  ];
  const maxRevenue = Math.max(...months.map((item) => item.revenue));
  const maxBookings = Math.max(...months.map((item) => item.bookings));

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">▤ Revenue and Booking Graphs</h2>
        <p className="text-sm text-[#7A6050]">Monthly platform revenue and booking growth.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-[#5A3E28]">▲ Revenue in Lakhs</h3>
          <div className="flex h-44 items-end gap-3 border-b border-[#C8B49A] px-2">
            {months.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-8 rounded-t bg-[#C8481A]"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                  title={`Rs ${item.revenue}L`}
                />
                <span className="text-xs text-[#7A6050]">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-[#5A3E28]">▣ Bookings</h3>
          <div className="flex h-44 items-end gap-3 border-b border-[#C8B49A] px-2">
            {months.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-8 rounded-t bg-[#1C2860]"
                  style={{ height: `${(item.bookings / maxBookings) * 100}%` }}
                  title={`${item.bookings} bookings`}
                />
                <span className="text-xs text-[#7A6050]">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
