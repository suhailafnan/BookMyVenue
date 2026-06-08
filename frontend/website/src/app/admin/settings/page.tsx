export default function AdminSettingsPage() {
  const settings = [
    { label: "Owner Auto-Approval", value: "Disabled", note: "Manual approval keeps venue quality high." },
    { label: "Platform Commission", value: "10%", note: "Applied after successful booking completion." },
    { label: "Payout Hold", value: "48 hours", note: "Protects users during event confirmation." },
    { label: "Dispute Escalation", value: "24 hours", note: "High-value disputes move to admin review." },
  ];

  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◇ Platform Settings</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Business rules for approvals, commission, payouts, and disputes.</p>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {settings.map((setting) => (
            <div key={setting.label} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
              <p className="text-sm text-[#7A6050]">◇ {setting.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#8A5C10]">{setting.value}</p>
              <p className="mt-2 text-sm text-[#5A3E28]">{setting.note}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
