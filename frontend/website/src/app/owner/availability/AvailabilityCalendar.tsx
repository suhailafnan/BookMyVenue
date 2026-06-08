export default function AvailabilityCalendar() {
  const openDates = ["Jun 10", "Jun 12", "Jun 15", "Jun 26"];
  const blockedDates = ["Jun 11", "Jun 18"];
  const peakDates = [
    { date: "Jun 22", venue: "Ironwood Courtyard", uplift: "+18%" },
    { date: "Jun 29", venue: "Grand Meridian Hall", uplift: "+22%" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
        <h2 className="font-semibold text-[#1E120A]">✓ Open Dates</h2>
        <ul className="mt-3 space-y-2">
          {openDates.map((date) => (
            <li key={date} className="rounded-md bg-[#FDFAF6] p-2 text-[#8A5C10]">
              {date}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
        <h2 className="font-semibold text-[#1E120A]">× Blocked Dates</h2>
        <ul className="mt-3 space-y-2">
          {blockedDates.map((date) => (
            <li key={date} className="rounded-md bg-[#FDFAF6] p-2 text-[#C8481A]">
              {date}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
        <h2 className="font-semibold text-[#1E120A]">▲ Peak Price Windows</h2>
        <ul className="mt-3 space-y-2">
          {peakDates.map((item) => (
            <li key={item.date} className="rounded-md bg-[#FDFAF6] p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#1E120A]">{item.date}</span>
                <span className="rounded-full bg-[#C8481A] px-2 py-1 text-xs text-white">{item.uplift}</span>
              </div>
              <p className="mt-1 text-sm text-[#7A6050]">{item.venue}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
