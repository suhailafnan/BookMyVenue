import VenueGallery from "@/features/venues/components/VenueGallery";
import VenueDetails from "@/features/venues/components/VenueDetails";
import VenueAmenities from "@/features/venues/components/VenueAmenities";
import VenuePricing from "@/features/venues/components/VenuePricing";
import VenueLocation from "@/features/venues/components/VenueLocation";

type VenueDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VenueDetailsPage({
  params,
}: VenueDetailsPageProps) {
  const { id } = await params;

  return (
    <main>
      <p>Venue ID: {id}</p>

      <VenueGallery />
      <VenueDetails />
      <VenueAmenities />
      <VenuePricing />
      <VenueLocation />
    </main>
  );
}