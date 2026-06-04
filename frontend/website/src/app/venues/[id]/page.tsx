import VenueGallery from "@/features/venues/components/VenueGallery";
import VenueDetails from "@/features/venues/components/VenueDetails";
import VenueAmenities from "@/features/venues/components/VenueAmenities";
import VenuePricing from "@/features/venues/components/VenuePricing";
import VenueLocation from "@/features/venues/components/VenueLocation";

type VenueDetailsPageProps = {
  params: {
    id: string;
  };
};

export default function VenueDetailsPage({
  params,
}: VenueDetailsPageProps) {
  return (
    <main>
      <p>Venue ID: {params.id}</p>

      <VenueGallery />

      <VenueDetails />

      <VenueAmenities />

      <VenuePricing />

      <VenueLocation />
    </main>
  );
}