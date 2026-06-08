import Link from "next/link";

export default function OwnerProfileSummary() {
  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-6 shadow-[0_16px_40px_rgba(30,18,10,0.08)]">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8481A] text-2xl font-semibold text-white shadow-[0_10px_24px_rgba(200,72,26,0.28)]">
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#1E120A]">◈ Anandhuu</h1>
            <p className="text-sm text-[#7A6050]">anandhuu@example.com</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-[#FDFAF6] px-3 py-1 text-[#8A5C10]">✓ Verified Host</span>
              <span className="rounded-full bg-[#1C2860] px-3 py-1 text-white">◈ 3 Active Listings</span>
              <span className="rounded-full bg-[#FDFAF6] px-3 py-1 text-[#B8691A]">✦ 4.8 Avg Rating</span>
            </div>
          </div>
        </div>

        <Link className="w-fit rounded-md bg-[#C8481A] px-5 py-3 font-medium text-white" href="/owner/venues/add">
          + Add Venue
        </Link>
      </div>
    </section>
  );
}
