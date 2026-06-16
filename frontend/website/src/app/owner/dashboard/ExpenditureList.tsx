import EmptyState from "@/components/EmptyState";

type ExpenditureListProps = {
  expenditures: Array<{
    label: string;
    amountDisplay: string;
    note: string;
  }>;
};

export default function ExpenditureList({ expenditures }: ExpenditureListProps) {
  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Monthly Expenditure</h2>
        <p className="text-sm text-[#7A6050]">Cost categories from saved expense records.</p>
      </div>

      <div className="space-y-3">
        {expenditures.length === 0 ? (
          <EmptyState title="No expenditure data" message="Cost categories will appear after real expense records are added." />
        ) : null}
        {expenditures.map((item) => (
          <div key={item.label} className="bmv-soft-card rounded-md p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-[#1E120A]">{item.label}</p>
              <p className="font-semibold text-[#C8481A]">{item.amountDisplay}</p>
            </div>
            <p className="mt-1 text-sm text-[#7A6050]">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
