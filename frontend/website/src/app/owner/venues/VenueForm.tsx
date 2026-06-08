export default function VenueForm() {
  return (
    <form className="space-y-4 rounded-lg border border-[#C8B49A] bg-[#FFFFFF] p-5 shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">◈ Venue Name</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="venueName" type="text" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">▤ Description</span>
        <textarea className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="description" rows={4} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">◉ Capacity</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="capacity" type="number" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">⬟ Price</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="price" type="number" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">✦ Amenities</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="amenities" type="text" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">▣ Images</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="images" type="file" multiple />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#5A3E28]">◇ Location</span>
        <input className="mt-1 w-full rounded-md border border-[#C8B49A] bg-[#FDFAF6] p-2 text-[#1E120A]" name="location" type="text" />
      </label>

      <button className="rounded-md bg-[#C8481A] px-4 py-2 text-white" type="submit">
        Save Venue
      </button>
    </form>
  );
}
