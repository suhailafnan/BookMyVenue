export default function VenueGallery() {
  const images = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  ];

  return (
    <section className="mb-10">

      <h2 className="text-3xl font-bold mb-6 text-[#1E120A]">
        Venue Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image}
            className="h-64 rounded-2xl bg-cover bg-center shadow-lg transition duration-300 hover:scale-105"
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
    </section>
  );
}
