type PlatformInsightsProps = {
  insights: Array<{
    label: string;
    value: string;
    tone: string;
  }>;
};

export default function PlatformInsights({ insights }: PlatformInsightsProps) {
  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Important Details</h2>
        <p className="text-sm text-[#7A6050]">Live business items admins should monitor daily.</p>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div key={item.label} className="bmv-soft-card flex items-center justify-between gap-3 rounded-md p-3">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${item.tone}`} />
              <p className="text-sm font-medium text-[#1E120A]">{item.label}</p>
            </div>
            <p className="font-semibold text-[#8A5C10]">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
