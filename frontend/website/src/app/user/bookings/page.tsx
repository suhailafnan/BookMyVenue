import Link from "next/link";

const upcomingBookings = [
  {
    id: "meridian-grand",
    venue: "The Meridian Grand",
    date: "Jun 14, 2026",
    time: "6:00 PM",
    location: "Kochi, Kerala",
    guests: 420,
    amount: "INR 1.2L",
    status: "Confirmed",
  },
  {
    id: "palm-court",
    venue: "Palm Court Banquets",
    date: "Jun 28, 2026",
    time: "11:00 AM",
    location: "Thrissur, Kerala",
    guests: 250,
    amount: "INR 95k",
    status: "Pending",
  },
];

const recentBookings = [
  {
    id: "royal-orchid",
    venue: "Royal Orchid Hall",
    date: "May 20, 2026",
    time: "5:30 PM",
    location: "Calicut, Kerala",
    guests: 180,
    amount: "INR 80k",
    status: "Completed",
  },
  {
    id: "lakeview-centre",
    venue: "Lakeview Convention Centre",
    date: "Apr 08, 2026",
    time: "10:00 AM",
    location: "Kochi, Kerala",
    guests: 620,
    amount: "INR 1.1L",
    status: "Completed",
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Confirmed"
      ? "bg-[#E4F3E8] text-[#2D7A45]"
      : status === "Pending"
      ? "bg-[#FFF2D9] text-[#9A6212]"
      : "bg-[#EFE7DF] text-[#7A6050]";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${statusClass}`}>
      {status}
    </span>
  );
}

export default function UserBookingsPage() {
  const totalBookings = upcomingBookings.length + recentBookings.length;

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10 text-[#1E120A]">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/user/dashboard"
              className="text-sm font-semibold text-[#B8691A]"
            >
              Back to Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-bold">My Bookings</h1>
            <p className="mt-2 text-[#7A6050]">
              Track your upcoming and recent venue bookings.
            </p>
          </div>
          <Link
            href="/"
            className="w-fit rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C8481A]/20"
          >
            Book Venue
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[#C8481A]">{totalBookings}</p>
            <p className="mt-2 text-[#9A836F]">Total Bookings</p>
          </div>
          <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[#B8691A]">
              {upcomingBookings.length}
            </p>
            <p className="mt-2 text-[#9A836F]">Upcoming</p>
          </div>
          <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[#304E8A]">
              {recentBookings.length}
            </p>
            <p className="mt-2 text-[#9A836F]">Completed</p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Upcoming Bookings</h2>
            <span className="text-sm font-semibold text-[#9A836F]">
              {upcomingBookings.length} active
            </span>
          </div>

          <div className="mt-6 divide-y divide-[#EFE7DF]">
            {upcomingBookings.map((booking) => (
              <article
                key={booking.id}
                className="grid gap-4 py-5 lg:grid-cols-[1fr_auto_auto] lg:items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{booking.venue}</h3>
                  <p className="mt-2 text-sm text-[#7A6050]">
                    {booking.date} at {booking.time} - {booking.location}
                  </p>
                  <p className="mt-1 text-sm text-[#9A836F]">
                    {booking.guests} guests - {booking.amount}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
                <Link
                  href={`/user/bookings/${booking.id}`}
                  className="w-fit rounded-xl border border-[#C8B49A] px-5 py-3 text-sm font-semibold text-[#5A3E28]"
                >
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {recentBookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{booking.venue}</h3>
                    <p className="mt-2 text-sm text-[#7A6050]">
                      {booking.date} - {booking.location}
                    </p>
                  </div>
                  <span className="font-bold text-[#B8691A]">
                    {booking.amount}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <StatusBadge status={booking.status} />
                  <Link
                    href={`/user/bookings/${booking.id}`}
                    className="text-sm font-semibold text-[#B8691A]"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
