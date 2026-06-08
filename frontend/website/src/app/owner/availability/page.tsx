import AvailabilityCalendar from "./AvailabilityCalendar";

export default function OwnerAvailabilityPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◇ Availability Planner</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Control open dates, blocked dates, and peak pricing windows.</p>
        </div>
        <AvailabilityCalendar />
      </div>
    </main>
  );
}
