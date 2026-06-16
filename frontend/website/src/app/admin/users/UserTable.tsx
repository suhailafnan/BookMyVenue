import EmptyState from "@/components/EmptyState";
import { getAdminUsers } from "@/lib/api";

export default async function UserTable() {
  const users = await getAdminUsers();

  if (users.length === 0) {
    return <EmptyState title="No users registered" message="Users will appear here after real accounts are created." />;
  }

  return (
    <div className="bmv-table-shell overflow-x-auto rounded-lg">
      <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] text-[#1E120A]">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Bookings</th>
            <th className="p-3">Value</th>
            <th className="p-3">Risk</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">{user.name}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.bookings}</td>
              <td className="p-3 font-semibold text-[#A07020]">{user.valueDisplay}</td>
              <td className="p-3">{user.risk}</td>
              <td className="p-3">
                <span className="bmv-badge bmv-badge-navy">{user.status}</span>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button className="bmv-accent-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Block User
                  </button>
                  <button className="bmv-outline-button rounded-md px-3 py-1.5 text-sm font-medium" type="button">
                    Unblock User
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
