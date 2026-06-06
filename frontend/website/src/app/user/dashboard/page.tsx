gitimport Link from "next/link";

const stats = [
  { label: "Total Bookings", value: "3", color: "text-[#C8481A]" },
  { label: "This Month", value: "1", color: "text-[#B8691A]" },
  { label: "Total Spent", value: "INR 2.5L", color: "text-[#8A5A13]" },
  { label: "Saved Venues", value: "12", color: "text-[#304E8A]" },
];

const upcomingBookings = [
  {
    venue: "The Meridian Grand",
    date: "Jun 14, 2026",
    status: "Confirmed",
    location: "Kochi, Kerala",
  },
  {
    venue: "Palm Court Banquets",
    date: "Jun 28, 2026",
    status: "Pending",
    location: "Thrissur, Kerala",
  },
];

const recentBookings = [
  {
    venue: "Royal Orchid Hall",
    date: "May 20, 2026",
    status: "Completed",
    amount: "INR 80k",
  },
  {
    venue: "Lakeview Convention Centre",
    date: "Apr 08, 2026",
    status: "Completed",
    amount: "INR 1.1L",
  },
];

const quickActions = [
  { label: "Book Venue", href: "/", icon: "BV" },
  { label: "Edit Profile", href: "/user/edit-profile", icon: "EP" },
  { label: "View Bookings", href: "/user/bookings", icon: "VB" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#1E120A]">
      <header className="border-b border-[#E1D4C3] bg-[#FBF8F4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/user/dashboard" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#C8481A] text-sm font-bold text-white shadow-sm">
              BM
            </span>
            <span className="text-2xl font-bold tracking-normal">
              BookMyVenue
            </span>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-medium text-[#7A6050] md:flex">
            <Link
              href="/user/dashboard"
              className="rounded-lg bg-[#F2E3DA] px-4 py-2 text-[#C8481A]"
            >
              Home
            </Link>
            <Link href="/" className="rounded-lg px-4 py-2 hover:bg-white">
              Search
            </Link>
            <Link
              href="/user/bookings"
              className="rounded-lg px-4 py-2 hover:bg-white"
            >
              My Bookings
            </Link>
            <Link href="/" className="rounded-lg px-4 py-2 hover:bg-white">
              Wishlist
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="grid h-11 w-11 place-items-center rounded-xl text-[#7A6050] hover:bg-white"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-[#E1D4C3] bg-white px-3 py-2 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C8481A] text-sm font-bold text-white">
                A
              </span>
              <span className="hidden font-semibold sm:block">User</span>
            </div>
            <Link
              href="/login"
              className="rounded-xl border border-[#C8B49A] bg-[#FBF8F4] px-4 py-3 text-sm font-semibold text-[#5A3E28]"
            >
              Exit
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#21120A] p-8 text-white shadow-sm sm:p-12">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#8E421E] opacity-60" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-medium text-[#C8B49A]">
              Good morning
            </p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              Welcome back, User!
            </h1>
            <p className="mt-4 text-lg text-[#D8C7B5]">
              You have 2 upcoming events this month.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-[#C8481A] px-7 py-4 font-semibold text-white shadow-lg shadow-[#C8481A]/25"
            >
              Find a Venue
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm"
            >
              <p className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="mt-3 text-[#9A836F]">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-9 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Upcoming Bookings</h2>
              <Link
                href="/user/bookings"
                className="rounded-xl border border-[#C8B49A] px-5 py-3 text-sm font-semibold text-[#5A3E28]"
              >
                View all
              </Link>
            </div>

            <div className="mt-7 divide-y divide-[#EFE7DF]">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.venue}
                  className="grid gap-4 py-5 sm:grid-cols-[72px_1fr_auto] sm:items-center"
                >
                  <div className="grid h-[72px] w-[72px] place-items-center rounded-xl bg-[#F7F3EE] text-sm font-bold text-[#C8481A]">
                    Hall
                  </div>
                  <div>
                    <h3 className="font-bold">{booking.venue}</h3>
                    <p className="mt-2 text-sm text-[#9A836F]">
                      {booking.date} - {booking.location}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-[#E4F3E8] px-4 py-2 text-sm font-semibold text-[#2D7A45]">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Profile Summary</h2>
              <div className="mt-6 flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#C8481A] text-xl font-bold text-white">
                  A
                </span>
                <div>
                  <h3 className="font-bold">User</h3>
                  <p className="mt-1 text-sm text-[#9A836F]">
                    Customer account
                  </p>
                </div>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9A836F]">Email</dt>
                  <dd className="font-medium">user@example.com</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9A836F]">Phone</dt>
                  <dd className="font-medium">+91 98765 43210</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9A836F]">Member since</dt>
                  <dd className="font-medium">2026</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Quick Actions</h2>
              <div className="mt-5 grid gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center justify-between rounded-xl border border-[#E8DDD0] bg-[#FBF8F4] px-4 py-3 font-semibold text-[#5A3E28]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-xs text-[#C8481A]">
                        {action.icon}
                      </span>
                      {action.label}
                    </span>
                    <span className="text-[#C8481A]">Go</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Link
              href="/user/bookings"
              className="text-sm font-semibold text-[#B8691A]"
            >
              View Bookings
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {recentBookings.map((booking) => (
              <div
                key={booking.venue}
                className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{booking.venue}</h3>
                    <p className="mt-2 text-sm text-[#9A836F]">
                      {booking.date}
                    </p>
                  </div>
                  <span className="font-bold text-[#B8691A]">
                    {booking.amount}
                  </span>
                </div>
                <p className="mt-4 w-fit rounded-full bg-[#EFE7DF] px-3 py-1 text-sm font-semibold text-[#7A6050]">
                  {booking.status}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
