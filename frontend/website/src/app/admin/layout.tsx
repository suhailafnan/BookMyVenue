import Link from "next/link";
import BookMyVenueLogo from "@/components/BookMyVenueLogo";

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "◆" },
  { label: "Users", href: "/admin/users", icon: "◉" },
  { label: "Venues", href: "/admin/venues", icon: "◈" },
  { label: "Bookings", href: "/admin/bookings", icon: "▣" },
  { label: "Reports", href: "/admin/reports", icon: "▤" },
  { label: "Settings", href: "/admin/settings", icon: "◇" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bmv-shell min-h-screen text-[#1E120A]">
      <header className="bmv-topbar sticky top-0 z-20 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <BookMyVenueLogo consoleLabel="Admin Console" subtitle="Platform Operations Control" />
          <nav className="flex flex-wrap gap-2 text-sm font-medium">
            {adminNavItems.map((item) => (
              <Link
                className="bmv-nav-link rounded-md px-3 py-2 text-[#5A3E28] hover:border-[#1C2860] hover:text-[#1C2860]"
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
