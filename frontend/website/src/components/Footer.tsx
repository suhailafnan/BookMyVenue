export default function Footer() {
  return (
    <footer className="bg-[#120A06] border-t border-[#4A3425] mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-[#F5E6D3] mb-4">
            BookMyVenue
          </h2>

          <p className="text-[#A87C5C]">
            Find and book premium venues for weddings,
            conferences and special events.
          </p>
        </div>

        <div>
          <h3 className="text-[#F5E6D3] font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-[#A87C5C]">
            <li>Home</li>
            <li>Venues</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#F5E6D3] font-semibold mb-4">
            Contact
          </h3>

          <p className="text-[#A87C5C]">
            support@bookmyvenue.com
          </p>

          <p className="text-[#A87C5C]">
            +91 98765 43210
          </p>
        </div>

      </div>

      <div className="border-t border-[#4A3425] py-4 text-center text-[#A87C5C]">
        © 2026 BookMyVenue. All rights reserved.
      </div>

    </footer>
  );
}