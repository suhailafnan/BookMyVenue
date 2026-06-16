export default function VenueForm() {
  return (
    <form className="bmv-hero-card space-y-5 rounded-lg p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8691A]">Venue Setup</p>
        <h2 className="mt-1 text-xl font-semibold text-[#1E120A]">Create a polished listing</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[#5A3E28]">Venue Name</span>
          <input className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="venueName" type="text" />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[#5A3E28]">Description</span>
          <textarea className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="description" rows={4} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#5A3E28]">Capacity</span>
          <input className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="capacity" type="number" />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#5A3E28]">Price</span>
          <input className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="price" type="number" />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#5A3E28]">Amenities</span>
          <input className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="amenities" type="text" />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#5A3E28]">Location</span>
          <input className="bmv-input w-full rounded-md px-3 py-2 text-[#1E120A]" name="location" type="text" />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[#5A3E28]">Images</span>
          <input
            className="bmv-input block w-full rounded-md px-3 py-2 text-[#1E120A] file:mr-3 file:rounded-md file:border-0 file:bg-[#C8481A] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
            name="images"
            type="file"
            multiple
          />
        </label>
      </div>

      <button className="bmv-accent-button rounded-md px-4 py-2 font-medium" type="submit">
        Save Venue
      </button>
    </form>
  );
}
