import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="max-w-4xl text-center px-6">

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Find Your Perfect Venue
          </h1>

          <p className="text-xl text-gray-200 mb-10">
            Discover wedding halls, conference centers,
            banquet halls and premium event spaces across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              href="/venues"
              className="px-8 py-4 rounded-xl bg-[#C8481A] hover:bg-[#B8691A] text-white font-semibold transition"
            >
              Explore Venues
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}