export default function VenueAmenities() {
  const amenities = [
    "Parking",
    "WiFi",
    "Air Conditioning",
    "Stage",
    "Catering",
    "Power Backup",
    "Security",
    "Projector",
  ];

  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg mt-8">

      <h2 className="text-3xl font-bold text-[#1E120A] mb-6">
        Amenities
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {amenities.map((item) => (
          <div
            key={item}
            className="
            border
            border-[#C8B49A]
            rounded-2xl
            p-4
            text-center
            bg-[#FDFAF6]
            hover:shadow-lg
            transition
            "
          >
            ✅ {item}
          </div>
        ))}

      </div>

    </section>
  );
}