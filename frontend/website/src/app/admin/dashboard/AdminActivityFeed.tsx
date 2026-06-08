export default function AdminActivityFeed() {
  const activities = [
    { title: "Venue approval pending", detail: "Rohan Mehta submitted The Atrium Loft." },
    { title: "High revenue owner", detail: "Maya Rao crossed Rs 9L this month." },
    { title: "Booking dispute opened", detail: "Booking B-3214 needs admin review." },
    { title: "User growth spike", detail: "62 new users joined this month." },
  ];

  return (
    <section className="rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">✦ Admin Activity</h2>
        <p className="text-sm text-[#7A6050]">Recent platform events and review items.</p>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.title} className="rounded-md bg-[#FDFAF6] p-3">
            <p className="font-medium text-[#1E120A]">◇ {activity.title}</p>
            <p className="mt-1 text-sm text-[#7A6050]">{activity.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
