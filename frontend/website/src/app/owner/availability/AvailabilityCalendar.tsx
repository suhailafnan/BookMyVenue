import EmptyState from "@/components/EmptyState";
import { getOwnerAvailability } from "@/lib/api";

export default async function AvailabilityCalendar() {
  const availability = await getOwnerAvailability();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="bmv-card rounded-lg p-4">
        <h2 className="font-semibold text-[#1E120A]">✓ Open Dates</h2>
        <div className="mt-3 space-y-2">
          {availability.openDates.length === 0 ? <EmptyState title="No open dates" message="Open dates will appear after availability is saved." /> : null}
          {availability.openDates.map((item) => (
            <div key={item.date} className="bmv-soft-card rounded-md p-2 text-[#8A5C10]">
              {item.displayDate}
            </div>
          ))}
        </div>
      </section>

      <section className="bmv-card rounded-lg p-4">
        <h2 className="font-semibold text-[#1E120A]">× Blocked Dates</h2>
        <div className="mt-3 space-y-2">
          {availability.blockedDates.length === 0 ? <EmptyState title="No blocked dates" message="Blocked dates will appear after availability is saved." /> : null}
          {availability.blockedDates.map((item) => (
            <div key={item.date} className="bmv-soft-card rounded-md p-2 text-[#C8481A]">
              {item.displayDate}
            </div>
          ))}
        </div>
      </section>

      <section className="bmv-card rounded-lg p-4">
        <h2 className="font-semibold text-[#1E120A]">▲ Peak Price Windows</h2>
        <div className="mt-3 space-y-2">
          {availability.peakDates.length === 0 ? <EmptyState title="No peak windows" message="Peak price windows will appear after uplift dates are saved." /> : null}
          {availability.peakDates.map((item) => (
            <div key={item.date} className="bmv-soft-card rounded-md p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#1E120A]">{item.displayDate}</span>
                {item.upliftDisplay ? <span className="bmv-badge bmv-badge-navy">{item.upliftDisplay}</span> : null}
              </div>
              <p className="mt-1 text-sm text-[#7A6050]">{item.venue}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
