"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <section className="max-w-lg rounded-lg border border-[#C8B49A] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#1E120A]">
          We could not load this view
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#7A6050]">
          {error.message || "Please retry the request."}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-[#C8481A] px-5 py-3 font-semibold text-white transition hover:bg-[#B8691A]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
