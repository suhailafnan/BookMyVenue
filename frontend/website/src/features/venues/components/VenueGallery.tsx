export default function VenueGallery() {
  return (
    <section className="mb-10">

      <h2 className="text-3xl font-bold mb-6 text-[#1E120A]">
        Venue Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"
          alt="Wedding Hall"
          className="
          w-full
          h-64
          object-cover
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
          duration-300
          "
        />

        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
          alt="Event Hall"
          className="
          w-full
          h-64
          object-cover
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
          duration-300
          "
        />

        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
          alt="Conference Hall"
          className="
          w-full
          h-64
          object-cover
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
          duration-300
          "
        />

      </div>

    </section>
  );
}