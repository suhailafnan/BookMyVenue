export default function VenuePerformanceCards() {
  const venues = [
    { name: "Grand Meridian Hall", occupancy: "82%", rating: "4.9", lead: "Corporate events", action: "Raise weekday price" },
    { name: "Ironwood Courtyard", occupancy: "61%", rating: "4.7", lead: "Weddings", action: "Add monsoon package" },
    { name: "Sunset Banquet Studio", occupancy: "48%", rating: "4.6", lead: "Birthdays", action: "Improve photos" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#1E120A]">◒ Venue Performance</h2>
        <p className="text-sm text-[#7A6050]">Quick business health signals for each active listing.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {venues.map((venue) => (
          <article key={venue.name} className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#1E120A]">◈ {venue.name}</h3>
                <p className="mt-1 text-sm text-[#7A6050]">{venue.lead}</p>
              </div>
              <span className="rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">{venue.occupancy}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-[#FDFAF6] p-3">
                <p className="text-[#7A6050]">✦ Rating</p>
                <p className="mt-1 font-semibold text-[#A07020]">{venue.rating}</p>
              </div>
              <div className="rounded-md bg-[#FDFAF6] p-3">
                <p className="text-[#7A6050]">◆ Next Action</p>
                <p className="mt-1 font-semibold text-[#8A5C10]">{venue.action}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
