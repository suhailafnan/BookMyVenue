import Link from "next/link";
import BookMyVenueLogo from "@/components/BookMyVenueLogo";

const ownerNavItems = [
  { label: "Dashboard", href: "/owner/dashboard", icon: "◆" },
  { label: "Venues", href: "/owner/venues", icon: "◈" },
  { label: "Bookings", href: "/owner/bookings", icon: "▣" },
  { label: "Availability", href: "/owner/availability", icon: "◇" },
  { label: "Earnings", href: "/owner/earnings", icon: "⬟" },
  { label: "Profile", href: "/owner/profile", icon: "◉" },
];

export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bmv-shell min-h-screen text-[#1E120A]">
      <header className="bmv-topbar sticky top-0 z-20 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <BookMyVenueLogo consoleLabel="Owner Console" subtitle="Business Management" />
          <nav className="flex flex-wrap gap-2 text-sm font-medium">
            {ownerNavItems.map((item) => (
              <Link
                className="bmv-nav-link rounded-md px-3 py-2 text-[#5A3E28] hover:border-[#C8481A] hover:text-[#C8481A]"
                href={item.href}
                key={item.href}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
