import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Venues", "/venues"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#C8B49A]/30 bg-[#1E120A]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-[#F7F3EE]">
          BookMyVenue
        </Link>

        <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:gap-6 sm:overflow-visible sm:pb-0">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-[#F7F3EE] transition hover:bg-white/10 hover:text-[#C8B49A]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
