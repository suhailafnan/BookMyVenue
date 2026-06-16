import EmptyState from "@/components/EmptyState";

type VenueFinanceTableProps = {
  venues: Array<{
    id: string;
    name: string;
    priceDisplay: string;
    monthlyRevenueDisplay: string;
    monthlyExpenditureDisplay: string;
    profitDisplay: string;
  }>;
};

export default function VenueFinanceTable({ venues }: VenueFinanceTableProps) {
  return (
    <section className="bmv-table-shell rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Venue Details</h2>
        <p className="text-sm text-[#7A6050]">Pricing, revenue, expenditure, and profit from saved venue records.</p>
      </div>

      {venues.length === 0 ? (
        <EmptyState title="No venue finance yet" message="Pricing, revenue, expenditure, and profit will appear after venues are added." />
      ) : (
        <div className="overflow-x-auto">
          <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
            <thead className="border-b border-[#C8B49A] text-[#1E120A]">
              <tr>
                <th className="p-3">Venue</th>
                <th className="p-3">Price</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Expense</th>
                <th className="p-3">Profit</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id} className="border-b border-[#C8B49A] last:border-0">
                  <td className="p-3 font-medium text-[#1E120A]">{venue.name}</td>
                  <td className="p-3 font-medium text-[#A07020]">{venue.priceDisplay}</td>
                  <td className="p-3 font-medium text-[#8A5C10]">{venue.monthlyRevenueDisplay}</td>
                  <td className="p-3 font-medium text-[#C8481A]">{venue.monthlyExpenditureDisplay}</td>
                  <td className="p-3 font-semibold text-[#8A5C10]">{venue.profitDisplay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
