export default function VenueDetails() {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg">

      <h2 className="text-4xl font-bold text-[#1E120A]">
        Royal Hall
      </h2>

      <p className="text-[#A07020] mt-2">
        ⭐⭐⭐⭐⭐ (4.9 Rating)
      </p>

      <p className="mt-3 text-[#5A3E28]">
        📍 Coimbatore, Tamil Nadu
      </p>

      <p className="mt-4 text-2xl font-bold text-[#C8481A]">
        ₹5,000 / Event
      </p>

      <p className="mt-4 text-[#7A6050]">
        A premium venue for weddings,
        conferences, corporate meetings
        and celebrations.
      </p>

      <div className="mt-6 space-y-2">

        <p>
          👥 Capacity: 500 Guests
        </p>

        <p>
          🏢 Venue Type: Banquet Hall
        </p>

        <p>
          📞 Contact: +91 9876543210
        </p>

      </div>

      <button
        className="
        mt-8
        bg-[#C8481A]
        text-white
        px-8
        py-3
        rounded-xl
        hover:bg-[#B8691A]
        transition
        "
      >
        Book Now
      </button>

    </section>
  );
}