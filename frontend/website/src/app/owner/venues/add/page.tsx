import VenueForm from "../VenueForm";

export default function AddVenuePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] p-6 text-[#1E120A]">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-[#1E120A]">+ Add Venue</h1>
        <VenueForm />
      </div>
    </main>
  );
}
