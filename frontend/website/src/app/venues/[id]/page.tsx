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
      <h1>Venue Details</h1>

      <p>Venue ID: {params.id}</p>
    </main>
  );
}