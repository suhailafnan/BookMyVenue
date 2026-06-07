import Link from "next/link";

export default function UserBookingDetailsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10 text-[#1E120A]">
      <section className="mx-auto max-w-4xl rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/user/bookings"
          className="text-sm font-semibold text-[#B8691A]"
        >
          Back to My Bookings
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold text-[#B8691A]">
              Booking Details
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Booking ID: BMV123
            </h1>

            <p className="mt-3 text-[#7A6050]">
              Complete booking information and payment details.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#E4F3E8] px-4 py-2 text-sm font-semibold text-[#2D7A45]">
            Confirmed
          </span>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Venue Name
            </dt>
            <dd className="mt-1 font-bold">
              The Meridian Grand
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Event Name
            </dt>
            <dd className="mt-1 font-bold">
              Arjun & Meera Wedding
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Event Type
            </dt>
            <dd className="mt-1 font-bold">
              Wedding
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Date
            </dt>
            <dd className="mt-1 font-bold">
              June 14, 2026
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Guests
            </dt>
            <dd className="mt-1 font-bold">
              420 Guests
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Amount Paid
            </dt>
            <dd className="mt-1 font-bold text-[#C8481A]">
              INR 1.2L
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4 sm:col-span-2">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Special Requests
            </dt>
            <dd className="mt-1 font-bold">
              Floral stage decoration, valet parking, vegetarian catering,
              dedicated photography zone, and guest welcome desk.
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Booking Status
            </dt>

            <dd className="mt-2">
              <span className="rounded-full bg-[#E4F3E8] px-3 py-1 text-sm font-semibold text-[#2D7A45]">
                Confirmed
              </span>
            </dd>
          </div>

          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">
              Payment Status
            </dt>

            <dd className="mt-2">
              <span className="rounded-full bg-[#E4F3E8] px-3 py-1 text-sm font-semibold text-[#2D7A45]">
                Paid
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C8481A]/20"
          >
            Download Receipt
          </button>

          <button
            type="button"
            className="rounded-xl border border-[#C8B49A] px-6 py-3 font-semibold text-[#5A3E28]"
          >
            Contact Venue
          </button>
        </div>
      </section>
    </main>
  );
}