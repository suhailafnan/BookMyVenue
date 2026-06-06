"use client";

import { useEffect, useState } from "react";

export default function WelcomeTag() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("welcomeTagSeen");

    if (!seen) {
      setShow(true);
    }
  }, []);

  const closeTag = () => {
    localStorage.setItem("welcomeTagSeen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="
      fixed
      bottom-6
      right-6
      z-50
      max-w-sm
      bg-white/90
      backdrop-blur-lg
      border
      border-[#C8B49A]
      shadow-2xl
      rounded-2xl
      p-4
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-[#1E120A]">
            🎉 Welcome to BookMyVenue
          </p>

          <p className="text-sm text-[#7A6050] mt-1">
            Find premium venues for weddings,
            conferences and events.
          </p>
        </div>

        <button
          onClick={closeTag}
          className="ml-4 text-gray-500"
        >
          ✕
        </button>
      </div>

      <button
        className="
        mt-4
        w-full
        bg-[#C8481A]
        text-white
        py-2
        rounded-xl
        hover:bg-[#A07020]
        "
      >
        Explore Venues
      </button>
    </div>
  );
}