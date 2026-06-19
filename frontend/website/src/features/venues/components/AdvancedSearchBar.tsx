"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AdvancedSearchBar() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(100);

  const cities = [
    "Coimbatore",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Kochi",
    "Mumbai",
    "Delhi",
  ];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div
      className="
        max-w-6xl
        mx-auto
        mt-10
        p-4
        bg-white/20
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        shadow-2xl
      "
    >
      <div className="grid md:grid-cols-4 gap-4">
        
        {/* Location */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search city or venue"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-[#C8B49A]
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#C8481A]
            "
          />

          {location && (
            <div
              className="
                absolute
                top-full
                left-0
                right-0
                bg-white
                border
                border-[#C8B49A]
                rounded-xl
                shadow-xl
                mt-2
                z-50
                overflow-hidden
              "
            >
              {filteredCities.map((city) => (
                <div
                  key={city}
                  onClick={() => setLocation(city)}
                  className="
                    p-3
                    cursor-pointer
                    hover:bg-[#F7F3EE]
                    transition
                  "
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar */}
        <DatePicker
          selected={date}
          onChange={(selectedDate: Date | null) =>
            setDate(selectedDate)
          }
          placeholderText="Select Date"
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#C8B49A]
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#C8481A]
          "
        />

        {/* Guests */}
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#C8B49A]
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#C8481A]
          "
        >
          <option value={50}>50 Guests</option>
          <option value={100}>100 Guests</option>
          <option value={200}>200 Guests</option>
          <option value={500}>500 Guests</option>
          <option value={1000}>1000 Guests</option>
        </select>

        {/* Search Button */}
        <button
          className="
            bg-[#C8481A]
            text-white
            rounded-2xl
            px-6
            py-4
            hover:bg-[#B8691A]
            transition
            font-semibold
          "
        >
          Search
        </button>
      </div>
    </div>
  );
}