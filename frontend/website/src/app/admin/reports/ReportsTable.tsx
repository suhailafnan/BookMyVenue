import { getAdminReports } from "@/lib/api";

export default async function ReportsTable() {
  const reports = await getAdminReports();

  return (
    <div className="bmv-table-shell overflow-x-auto rounded-lg">
      <table className="bmv-data-table w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] text-[#1E120A]">
          <tr>
            <th className="p-3">Report</th>
            <th className="p-3">Value</th>
            <th className="p-3">Trend</th>
            <th className="p-3">Source</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.label} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">{report.label}</td>
              <td className="p-3 font-semibold text-[#A07020]">{report.value}</td>
              <td className="p-3 text-[#8A5C10]">{report.trend}</td>
              <td className="p-3">{report.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
