import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#120A06] border-b border-[#4A3425]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-[#F5E6D3]">
          BookMyVenue
        </h1>

        <div className="flex gap-8">
          <Link
            href="/"
            className="text-[#F5E6D3] hover:text-[#C9913A]"
          >
            Home
          </Link>

          <Link
            href="/venues"
            className="text-[#F5E6D3] hover:text-[#C9913A]"
          >
            Venues
          </Link>

          <Link
            href="/about"
            className="text-[#F5E6D3] hover:text-[#C9913A]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-[#F5E6D3] hover:text-[#C9913A]"
          >
            Contact
          </Link>
        </div>

      </div>
    </nav>
  );
}