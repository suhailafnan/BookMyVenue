export default function Footer() {
  const links = [
    ["Home", "/"],
    ["Venues", "/venues"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  return (
    <footer className="border-t border-[#C8B49A]/30 bg-[#1E120A]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#F7F3EE]">
            BookMyVenue
          </h2>

          <p className="leading-7 text-[#C8B49A]">
            Find and book premium venues for weddings,
            conferences and special events.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#F7F3EE]">
            Quick Links
          </h3>

          <ul className="space-y-2 text-[#C8B49A]">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#F7F3EE]">
            Contact
          </h3>

          <p className="text-[#C8B49A]">
            support@bookmyvenue.com
          </p>

          <p className="text-[#C8B49A]">
            +91 98765 43210
          </p>
        </div>
      </div>

      <div className="border-t border-[#C8B49A]/20 py-4 text-center text-[#C8B49A]">
        © 2026 BookMyVenue. All rights reserved.
      </div>
    </footer>
  );
}
