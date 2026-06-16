import EmptyState from "@/components/EmptyState";

type AdminActivityFeedProps = {
  activities: Array<{
    title: string;
    detail: string;
  }>;
};

export default function AdminActivityFeed({ activities }: AdminActivityFeedProps) {
  return (
    <section className="bmv-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#1E120A]">Admin Activity</h2>
        <p className="text-sm text-[#7A6050]">Recent registered records and review items.</p>
      </div>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <EmptyState title="No admin activity yet" message="New owner registrations and venue submissions will appear here." />
        ) : null}
        {activities.map((activity) => (
          <div key={`${activity.title}-${activity.detail}`} className="bmv-soft-card rounded-md p-3">
            <p className="font-medium text-[#1E120A]">{activity.title}</p>
            <p className="mt-1 text-sm text-[#7A6050]">{activity.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
