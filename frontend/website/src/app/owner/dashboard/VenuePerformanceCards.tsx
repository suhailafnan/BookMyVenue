import EmptyState from "@/components/EmptyState";

type VenuePerformanceCardsProps = {
  venues: Array<{
    id: string;
    name: string;
    occupancy: string;
    rating: string;
    lead: string;
    action: string;
  }>;
};

export default function VenuePerformanceCards({ venues }: VenuePerformanceCardsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#1E120A]">Venue Performance</h2>
        <p className="text-sm text-[#7A6050]">Quick business health signals for each active listing.</p>
      </div>
      {venues.length === 0 ? (
        <EmptyState title="No venues yet" message="Venue performance cards will appear after this owner adds venues." />
      ) : null}
      <div className="grid gap-4 lg:grid-cols-3">
        {venues.map((venue) => (
          <article key={venue.id} className="bmv-card rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#1E120A]">{venue.name}</h3>
                <p className="mt-1 text-sm text-[#7A6050]">{venue.lead}</p>
              </div>
              <span className="bmv-badge bmv-badge-navy">{venue.occupancy}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="bmv-soft-card rounded-md p-3">
                <p className="text-[#7A6050]">Rating</p>
                <p className="mt-1 font-semibold text-[#A07020]">{venue.rating}</p>
              </div>
              <div className="bmv-soft-card rounded-md p-3">
                <p className="text-[#7A6050]">Next Action</p>
                <p className="mt-1 font-semibold text-[#8A5C10]">{venue.action}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
