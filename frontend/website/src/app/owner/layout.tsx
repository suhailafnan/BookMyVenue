import Link from "next/link";

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
    <div className="min-h-screen bg-[#F7F3EE] text-[#1E120A]">
      <header className="sticky top-0 z-20 border-b border-[#C8B49A] bg-[#FFFFFF]/95 shadow-[0_8px_30px_rgba(30,18,10,0.08)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#C8481A] text-xl text-white shadow-[0_8px_20px_rgba(200,72,26,0.25)]">
              ◈
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-[#B8691A]">Owner Console ✦</p>
              <h1 className="text-xl font-semibold text-[#1E120A]">BookMyVenue Business Management</h1>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-medium">
            {ownerNavItems.map((item) => (
              <Link
                className="rounded-md border border-[#C8B49A] bg-[#FDFAF6] px-3 py-2 text-[#5A3E28] shadow-sm transition hover:border-[#C8481A] hover:text-[#C8481A]"
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
