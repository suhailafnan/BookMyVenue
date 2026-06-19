import Link from "next/link";

const stats = [
  ["250+", "curated venues"],
  ["18", "cities covered"],
  ["4.8/5", "average host rating"],
  ["32k+", "guests planned"],
];

const team = [
  ["Ananya Rao", "Venue Partnerships"],
  ["Karthik Menon", "Operations"],
  ["Meera Thomas", "Customer Success"],
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#1E120A] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C8B49A]">
            About BookMyVenue
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            A calmer way to discover, compare, and book event spaces.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#F7F3EE] sm:text-lg">
            We connect event planners, families, founders, and communities with
            reliable venues that publish clear pricing, useful amenities, and
            practical availability.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
            Company Story
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#1E120A]">
            Built for decisions that usually take too many phone calls.
          </h2>
        </div>
        <p className="text-base leading-8 text-[#5A3E28]">
          BookMyVenue started with a simple observation: venue booking is often
          emotional, expensive, and time-sensitive, yet the information is
          scattered. Our platform organizes venue inventory into searchable,
          comparable listings so customers can move from shortlist to booking
          with confidence.
        </p>
      </section>

      <section className="bg-[#FDFAF6] py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <ValueCard title="Mission" text="Make venue discovery transparent, fast, and accessible for every type of event." />
          <ValueCard title="Vision" text="Become the trusted operating layer for local venue inventory across India." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading label="Why Choose Us" title="Designed for confident planning" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Verified venue details",
            "Transparent starting prices",
            "Capacity and amenity filters",
            "Responsive booking support",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-[#C8B49A] bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#1E120A]">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-[#7A6050]">
                Practical information presented clearly for faster comparison.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1C2860] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-6">
              <p className="text-4xl font-bold">{value}</p>
              <p className="mt-2 text-sm text-[#C8B49A]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading label="Team" title="Operators, designers, and venue specialists" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {team.map(([name, role]) => (
            <div key={name} className="rounded-lg border border-[#C8B49A] bg-[#FDFAF6] p-6">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E120A] text-lg font-bold text-white">
                {name.charAt(0)}
              </div>
              <h3 className="font-bold text-[#1E120A]">{name}</h3>
              <p className="mt-1 text-sm text-[#7A6050]">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-lg bg-[#1E120A] p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ready to plan your next event?</h2>
            <p className="mt-2 text-[#C8B49A]">Explore venues or talk to our team.</p>
          </div>
          <Link href="/venues" className="rounded-md bg-[#C8481A] px-5 py-3 text-center font-bold text-white hover:bg-[#B8691A]">
            Browse Venues
          </Link>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-[#C8B49A] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E120A]">{title}</h2>
      <p className="mt-3 leading-7 text-[#5A3E28]">{text}</p>
    </article>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-[#1E120A] md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
