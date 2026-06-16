import UserTable from "./UserTable";

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  return (
    <main className="bmv-page min-h-screen p-6 text-[#1E120A]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E120A]">◉ User and Owner Management</h1>
          <p className="mt-1 text-sm text-[#7A6050]">Monitor account status, owner verification, booking value, and risk.</p>
        </div>
        <UserTable />
      </div>
    </main>
  );
}
