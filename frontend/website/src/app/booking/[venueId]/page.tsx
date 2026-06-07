"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");

  const venueCost = 120000;
  const tax = venueCost * 0.18;
  const total = venueCost + tax;

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10">
      <section className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Booking Form */}

        <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-[#1E120A]">
            Book Venue
          </h1>

          <p className="mt-2 text-[#7A6050]">
            Fill in your event details.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="font-semibold">
                Venue Information
              </label>

              <div className="mt-2 rounded-xl bg-[#FBF8F4] p-4 border border-[#EFE7DF]">
                <h2 className="font-bold">
                  The Meridian Grand
                </h2>

                <p className="text-sm text-[#7A6050]">
                  Kochi • Wedding Hall • 650 Guests
                </p>
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Event Name
              </label>

              <input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Event Type
              </label>

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
              >
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Conference</option>
                <option>Meeting</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-semibold">
                  Start Time
                </label>

                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
                />
              </div>

              <div>
                <label className="font-semibold">
                  End Time
                </label>

                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Number of Guests
              </label>

              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Special Requests
              </label>

              <textarea
                rows={4}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#C8B49A] px-4 py-3"
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Summary */}

        <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-[#1E120A]">
            Booking Summary
          </h2>

          <div className="mt-6 space-y-4">
            <SummaryRow
              label="Venue"
              value="The Meridian Grand"
            />

            <SummaryRow
              label="Date"
              value={date || "Not selected"}
            />

            <SummaryRow
              label="Guests"
              value={guests || "0"}
            />

            <SummaryRow
              label="Venue Cost"
              value={`₹${venueCost.toLocaleString()}`}
            />

            <SummaryRow
              label="Tax"
              value={`₹${tax.toLocaleString()}`}
            />
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>

              <span>
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              router.push("/payment-status?status=success")
            }
            className="mt-6 w-full rounded-xl bg-[#C8481A] py-3 font-semibold text-white"
          >
            Proceed To Payment
          </button>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-[#7A6050]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}