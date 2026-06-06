"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  defaultUserProfile,
  getStoredUserProfile,
  UserProfile,
} from "@/features/user/profileStore";

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    setProfile(getStoredUserProfile());
  }, []);

  const profileInitial = profile.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10 text-[#1E120A]">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/user/dashboard"
          className="text-sm font-semibold text-[#B8691A]"
        >
          Back to Dashboard
        </Link>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="h-28 w-28 rounded-3xl object-cover shadow-sm"
            />
          ) : (
            <div className="grid h-28 w-28 place-items-center rounded-3xl bg-[#C8481A] text-4xl font-bold text-white shadow-sm">
              {profileInitial}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-[#B8691A]">Profile</p>
            <h1 className="mt-2 text-3xl font-bold">{profile.name}</h1>
            <p className="mt-2 text-[#7A6050]">
              Customer account for booking and managing venues.
            </p>
          </div>
        </div>

        <dl className="mt-8 grid gap-4">
          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">Name</dt>
            <dd className="mt-1 font-bold">{profile.name}</dd>
          </div>
          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">Email</dt>
            <dd className="mt-1 font-bold">{profile.email}</dd>
          </div>
          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">Phone</dt>
            <dd className="mt-1 font-bold">{profile.phone}</dd>
          </div>
          <div className="rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            <dt className="text-sm font-semibold text-[#9A836F]">Address</dt>
            <dd className="mt-1 font-bold">{profile.address}</dd>
          </div>
        </dl>

        <Link
          href="/user/edit-profile"
          className="mt-8 inline-flex rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C8481A]/20"
        >
          Edit Profile
        </Link>
      </section>
    </main>
  );
}
