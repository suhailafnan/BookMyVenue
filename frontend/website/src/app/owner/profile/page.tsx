export default function OwnerProfilePage() {
  const profileItems = [
    { label: "Business Name", value: "Anandhuu Hospitality" },
    { label: "Verification", value: "Verified Host" },
    { label: "GST Status", value: "Active" },
    { label: "Payout Account", value: "HDFC ending 1820" },
  ];

  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◉ Owner Profile</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Business identity, compliance, and payout information.</p>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {profileItems.map((item) => (
            <div key={item.label} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-4 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
              <p className="text-sm text-[#7A6050]">{item.label}</p>
              <p className="mt-2 font-semibold text-[#1E120A]">{item.value}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
