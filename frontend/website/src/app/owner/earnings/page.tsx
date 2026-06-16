import EarningsCard from "./EarningsCard";

export const dynamic = "force-dynamic";

export default function OwnerEarningsPage() {
  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="bmv-hero-card rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Finance</p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">Earnings and Profit</h1>
          <p className="mt-2 text-sm text-[#7A6050]">A clean view of income, retained value, and how each venue contributes to the month.</p>
        </section>
        <EarningsCard />
      </div>
    </main>
  );
}
