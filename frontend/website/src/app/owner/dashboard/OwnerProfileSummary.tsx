import Link from "next/link";

type OwnerProfileSummaryProps = {
  profile: {
    name: string;
    email: string;
    verification: string;
    activeListings: number;
    rating: number;
  };
};

export default function OwnerProfileSummary({ profile }: OwnerProfileSummaryProps) {
  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <section className="bmv-hero-card rounded-lg p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#086C6C] text-2xl font-semibold text-white shadow-[0_12px_28px_rgba(8,108,108,0.24)]">
            {initial}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Owner Snapshot</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">{profile.name}</h1>
            <p className="text-sm text-[#7A6050]">{profile.email}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
              <span className="bmv-badge bmv-badge-teal">{profile.verification}</span>
              <span className="bmv-badge bmv-badge-navy">{profile.activeListings} Active Listings</span>
              <span className="bmv-badge bmv-badge-gold">{profile.rating ? profile.rating.toFixed(1) : "New"} Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bmv-soft-card rounded-lg p-4 text-sm text-[#5A3E28]">
            <p className="font-semibold text-[#1E120A]">Business Readiness</p>
            <p className="mt-1 text-[#7A6050]">Keep venue details and availability current to turn enquiries into confirmed bookings.</p>
          </div>
          <Link className="bmv-accent-button inline-flex w-fit rounded-md px-5 py-3 font-medium" href="/owner/venues/add">
            Add Venue
          </Link>
        </div>
      </div>
    </section>
  );
}
