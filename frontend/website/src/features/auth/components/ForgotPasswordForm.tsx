import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-[#1E120A]">
        Forgot Password
      </h1>

      <p className="mt-3 text-[#7A6050]">
        Enter your email and we'll send you a reset link.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-[#5A3E28]">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#C8B49A] px-4 py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#C8481A] py-3 text-white font-medium hover:opacity-90 transition"
        >
          Send Reset Link
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-[#B8691A]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
