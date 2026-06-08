export default function UserTable() {
  const users = [
    { id: "U001", name: "Aarav Sharma", role: "User", bookings: 6, value: "Rs 2.4L", risk: "Low", status: "Active" },
    { id: "U002", name: "Maya Rao", role: "Owner", bookings: 28, value: "Rs 9.8L", risk: "Low", status: "Verified" },
    { id: "U003", name: "Rohan Mehta", role: "Owner", bookings: 7, value: "Rs 2.1L", risk: "Medium", status: "Review" },
    { id: "U004", name: "Dev Nair", role: "User", bookings: 2, value: "Rs 76,000", risk: "High", status: "Flagged" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B49A] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <table className="w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
          <tr>
            <th className="p-3">◉ Name</th>
            <th className="p-3">⬟ Role</th>
            <th className="p-3">▣ Bookings</th>
            <th className="p-3">▲ Value</th>
            <th className="p-3">◆ Risk</th>
            <th className="p-3">◇ Status</th>
            <th className="p-3">✦ Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">◉ {user.name}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.bookings}</td>
              <td className="p-3 font-semibold text-[#A07020]">{user.value}</td>
              <td className="p-3">{user.risk}</td>
              <td className="p-3">
                <span className="rounded-full bg-[#1C2860] px-2 py-1 text-xs text-white">✦ {user.status}</span>
              </td>
              <td className="flex gap-2 p-3">
                <button className="rounded-md bg-[#C8481A] px-3 py-1 text-white" type="button">
                  × Block User
                </button>
                <button className="rounded-md border border-[#B09878] px-3 py-1 text-[#B8691A]" type="button">
                  ✓ Unblock User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
