import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">
          BookMyVenue
        </h1>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/venues">Venues</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}