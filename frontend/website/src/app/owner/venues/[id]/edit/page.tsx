import VenueForm from "../../VenueForm";

type EditVenuePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditVenuePage({ params }: EditVenuePageProps) {
  const { id } = await params;

  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-[#1E120A]">◇ Edit Venue</h1>
        <p className="text-sm text-[#7A6050]">Venue ID: {id}</p>
        <VenueForm />
      </div>
    </main>
  );
}
