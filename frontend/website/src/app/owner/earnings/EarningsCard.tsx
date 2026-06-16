import EmptyState from "@/components/EmptyState";
import { getOwnerEarnings } from "@/lib/api";

export default async function EarningsCard() {
  const earnings = await getOwnerEarnings();

  if (!earnings) {
    return <EmptyState title="No owner earnings" message="Earnings will appear after an owner profile and booking records exist." />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {earnings.cards.map((row) => (
          <div key={row.label} className="bmv-card rounded-lg p-4">
            <p className="text-sm text-[#7A6050]">
              {row.icon} {row.label}
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold text-[#A07020]">{row.value}</p>
          </div>
        ))}
      </div>

      <section className="bmv-card rounded-lg p-5">
        <h2 className="text-lg font-semibold text-[#1E120A]">Venue Profit Split</h2>
        <div className="mt-4 space-y-4">
          {earnings.profitSplit.length === 0 ? (
            <EmptyState title="No profit split yet" message="Venue profit split will appear after venues receive finance data." />
          ) : null}
          {earnings.profitSplit.map((item) => (
            <div key={item.id}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#5A3E28]">{item.label}</span>
                <span className="font-semibold text-[#8A5C10]">{item.value}</span>
              </div>
              <div className="bmv-soft-card h-3 rounded-full">
                <div className="h-3 rounded-full bg-[#C8481A] shadow-[0_6px_14px_rgba(200,72,26,0.2)]" style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
