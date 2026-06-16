import { getAdminSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="bmv-hero-card rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Admin Rules</p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1E120A]">Platform Settings</h1>
          <p className="mt-2 text-sm text-[#7A6050]">Business rules for approvals, commission, payouts, and disputes.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {settings.map((setting) => (
            <div key={setting.key} className="bmv-card rounded-lg p-4">
              <p className="text-sm text-[#7A6050]">{setting.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#8A5C10]">{setting.value}</p>
              <p className="mt-2 text-sm text-[#5A3E28]">{setting.note}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
