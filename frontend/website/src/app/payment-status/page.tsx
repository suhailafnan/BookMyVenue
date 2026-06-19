"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusContent />
    </Suspense>
  );
}

function PaymentStatusContent() {
  const params = useSearchParams();
  const success = params.get("status") === "success";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] p-6">
      <section className="w-full max-w-xl rounded-2xl border border-[#E8DDD0] bg-white p-8 text-center shadow-sm">
        {success ? (
          <>
            <div className="text-4xl font-bold text-[#2F7D32]">Success</div>

            <h1 className="mt-4 text-3xl font-bold">Payment Successful</h1>

            <div className="mt-8 space-y-3 text-left">
              <InfoRow label="Booking ID" value="BMV123" />
              <InfoRow label="Venue Name" value="The Meridian Grand" />
              <InfoRow label="Amount Paid" value="Rs. 141,600" />
              <InfoRow label="Transaction ID" value="TXN982341" />
            </div>

            <Link
              href="/user/bookings/meridian-grand"
              className="mt-8 inline-flex rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white"
            >
              View Booking
            </Link>
          </>
        ) : (
          <>
            <div className="text-4xl font-bold text-[#C8481A]">Failed</div>

            <h1 className="mt-4 text-3xl font-bold">Payment Failed</h1>

            <p className="mt-3 text-[#7A6050]">
              Something went wrong while processing your payment.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white"
            >
              Retry Payment
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#7A6050]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
