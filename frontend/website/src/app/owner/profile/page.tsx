import EmptyState from "@/components/EmptyState";
import { getOwnerProfile } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function OwnerProfilePage() {
  const profile = await getOwnerProfile();

  if (!profile) {
    return (
      <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1E120A]">◉ Owner Profile</h1>
            <p className="mt-1 text-sm text-[#7A6050]">Business identity, compliance, and payout information.</p>
          </div>
          <EmptyState title="No owner profile registered" message="Profile details will appear after an owner account is created through the backend." />
        </div>
      </main>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const businessItems = [
    { label: "Business Name", value: profile.businessName },
    { label: "Owner Email", value: profile.email },
    { label: "Active Listings", value: String(profile.activeListings) },
    { label: "Average Rating", value: profile.rating ? profile.rating.toFixed(1) : "New" },
  ];

  const complianceItems = [
    { label: "Verification", value: profile.verification },
    { label: "GST Status", value: profile.gstStatus },
    { label: "Payout Account", value: profile.payoutAccount },
    { label: "Account Status", value: profile.status },
  ];

  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="bmv-hero-card rounded-lg p-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#086C6C] text-2xl font-semibold text-white shadow-[0_12px_28px_rgba(8,108,108,0.22)]">
                {initials}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-normal text-[#B8691A]">Professional Owner Profile</p>
                <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">{profile.name}</h1>
                <p className="mt-1 text-sm text-[#7A6050]">{profile.businessName}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="bmv-badge bmv-badge-teal">{profile.verification}</span>
                  <span className="bmv-badge bmv-badge-navy">{profile.activeListings} Listings</span>
                  <span className="bmv-badge bmv-badge-gold">GST: {profile.gstStatus}</span>
                </div>
              </div>
            </div>

            <div className="bmv-soft-card rounded-lg p-4 text-sm">
              <p className="font-semibold text-[#1E120A]">Account Readiness</p>
              <p className="mt-2 text-[#7A6050]">Complete compliance, payout, and venue details before accepting high-value bookings.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="bmv-card rounded-lg p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#1E120A]">Business Details</h2>
              <p className="text-sm text-[#7A6050]">Core identity and marketplace visibility.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {businessItems.map((item) => (
                <div key={item.label} className="bmv-soft-card rounded-md p-4">
                  <p className="text-xs font-medium uppercase tracking-normal text-[#7A6050]">{item.label}</p>
                  <p className="mt-2 font-semibold text-[#1E120A]">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bmv-card rounded-lg p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#1E120A]">Compliance and Payout</h2>
              <p className="text-sm text-[#7A6050]">Operational checks required for safe payouts.</p>
            </div>
            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item.label} className="bmv-soft-card flex items-center justify-between gap-3 rounded-md p-3">
                  <p className="text-sm text-[#7A6050]">{item.label}</p>
                  <p className="text-right text-sm font-semibold text-[#1E120A]">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
