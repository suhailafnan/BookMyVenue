"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  return (
    <div className="bg-white w-full max-w-md rounded-xl border border-[#C8B49A] p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-[#1E120A]">
        Welcome Back
      </h1>

      <p className="mt-2 text-[#7A6050]">
        Login to continue booking your venues.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/user/dashboard");
        }}
      >
        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-[#C8B49A] px-4 py-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#C8481A] py-3 text-white font-medium"
        >
          Login
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link
          href="/forget-password"
          className="text-[#B8691A]"
        >
          Forgot Password?
        </Link>

        <Link
          href="/register"
          className="text-[#B8691A]"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
