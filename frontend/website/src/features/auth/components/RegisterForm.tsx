import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="bg-white w-full max-w-md rounded-xl border border-[#C8B49A] p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-[#1E120A]">
        Create Account
      </h1>

      <p className="mt-2 text-[#7A6050]">
        Join BookMyVenue today.
      </p>

      <form className="mt-6 space-y-4">

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        {/* Account Type */}
        <div>
          <p className="mb-2 font-medium text-[#5A3E28]">
            Account Type
          </p>

          <label className="mr-4">
            <input type="radio" name="role" /> Customer
          </label>

          <label>
            <input type="radio" name="role" /> Venue Owner
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#C8481A] py-3 text-white font-medium"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="text-[#B8691A]"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
