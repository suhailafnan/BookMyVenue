"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  defaultUserProfile,
  getStoredUserProfile,
  saveStoredUserProfile,
  UserProfile,
} from "@/features/user/profileStore";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    setProfile(getStoredUserProfile());
  }, []);

  function updateField(field: keyof UserProfile, value: string) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("photo", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveStoredUserProfile(profile);
    router.push("/user/profile");
  }

  const profileInitial = profile.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-10 text-[#1E120A]">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/user/profile"
          className="text-sm font-semibold text-[#B8691A]"
        >
          Back to Profile
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold text-[#B8691A]">Profile</p>
          <h1 className="mt-2 text-3xl font-bold">Edit Profile</h1>
          <p className="mt-3 text-[#7A6050]">
            Update your account details and profile photo.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 rounded-xl border border-[#EFE7DF] bg-[#FBF8F4] p-4">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile preview"
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-2xl bg-[#C8481A] text-2xl font-bold text-white">
                {profileInitial}
              </span>
            )}
            <div>
              <p className="font-semibold">Profile Photo</p>
              <p className="mt-1 text-sm text-[#7A6050]">
                Upload a photo to show it on your profile and dashboard.
              </p>
            </div>
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-[#5A3E28]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-lg border border-[#C8B49A] bg-white px-4 py-3 outline-none focus:border-[#C8481A]"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-[#5A3E28]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-lg border border-[#C8B49A] bg-white px-4 py-3 outline-none focus:border-[#C8481A]"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-[#5A3E28]"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="w-full rounded-lg border border-[#C8B49A] bg-white px-4 py-3 outline-none focus:border-[#C8481A]"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-[#5A3E28]"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              id="address"
              value={profile.address}
              onChange={(event) => updateField("address", event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-[#C8B49A] bg-white px-4 py-3 outline-none focus:border-[#C8481A]"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-[#5A3E28]"
              htmlFor="photo"
            >
              Profile Photo Upload
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full rounded-lg border border-dashed border-[#C8B49A] bg-[#FBF8F4] px-4 py-3 text-[#7A6050] file:mr-4 file:rounded-lg file:border-0 file:bg-[#C8481A] file:px-4 file:py-2 file:font-semibold file:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#C8481A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C8481A]/20 sm:w-auto"
          >
            Save Changes
          </button>
        </form>
      </section>
    </main>
  );
}
