type OwnerStatsProps = {
  stats: Array<{
    label: string;
    value: string;
    note: string;
    icon: string;
  }>;
};

export default function OwnerStats({ stats }: OwnerStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bmv-card rounded-lg p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#7A6050]">{stat.label}</p>
            <span className="bmv-soft-card flex h-10 w-10 items-center justify-center rounded-md text-lg">{stat.icon}</span>
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold text-[#8A5C10]">{stat.value}</p>
          <p className="mt-2 text-xs leading-5 text-[#7A6050]">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}
