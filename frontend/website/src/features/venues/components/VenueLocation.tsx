export default function VenueLocation() {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg mt-8">

      <h2 className="text-3xl font-bold text-[#1E120A] mb-6">
        Location
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-lg text-[#5A3E28]">
            📍 Address
          </p>

          <p className="mt-3 text-[#7A6050]">
            123 MG Road
            <br />
            Coimbatore
            <br />
            Tamil Nadu
            <br />
            India
          </p>

          <div className="mt-6 space-y-2">

            <p>🚗 Parking Available</p>

            <p>🚌 Near Bus Stand</p>

            <p>🚉 5 km from Railway Station</p>

          </div>

        </div>

        <div
          className="
          h-64
          rounded-2xl
          bg-[#FDFAF6]
          border
          border-[#C8B49A]
          flex
          items-center
          justify-center
          text-[#7A6050]
          "
        >
          Google Map Coming Soon
        </div>

      </div>

    </section>
  );
}