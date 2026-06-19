export default function VenuePricing() {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg mt-8">

      <h2 className="text-3xl font-bold text-[#1E120A] mb-6">
        Pricing
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border border-[#C8B49A] rounded-2xl p-6">
          <h3 className="font-semibold text-xl">
            Weekday
          </h3>

          <p className="text-3xl font-bold text-[#C8481A] mt-3">
            ₹5,000
          </p>

          <p className="text-[#7A6050] mt-2">
            Per Day
          </p>
        </div>

        <div className="border border-[#C8B49A] rounded-2xl p-6">
          <h3 className="font-semibold text-xl">
            Weekend
          </h3>

          <p className="text-3xl font-bold text-[#C8481A] mt-3">
            ₹7,000
          </p>

          <p className="text-[#7A6050] mt-2">
            Per Day
          </p>
        </div>

        <div className="border border-[#C8B49A] rounded-2xl p-6">
          <h3 className="font-semibold text-xl">
            Full Package
          </h3>

          <p className="text-3xl font-bold text-[#C8481A] mt-3">
            ₹25,000
          </p>

          <p className="text-[#7A6050] mt-2">
            Venue + Decoration
          </p>
        </div>

      </div>

    </section>
  );
}