type DashboardCardsProps = {
  cards: Array<{
    label: string;
    value: string;
    note: string;
    icon: string;
  }>;
};

export default function DashboardCards({ cards }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className="bmv-card rounded-lg p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#7A6050]">{card.label}</p>
            <span className="bmv-soft-card flex h-10 w-10 items-center justify-center rounded-md text-lg">{card.icon}</span>
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold text-[#8A5C10]">{card.value}</p>
          <p className="mt-2 text-xs leading-5 text-[#7A6050]">{card.note}</p>
        </div>
      ))}
    </div>
  );
}
