export default function ReportsTable() {
  const reports = [
    { label: "Revenue", value: "Rs 92.8L", trend: "+21%", owner: "Maya Rao" },
    { label: "Bookings", value: "2,430", trend: "+14%", owner: "Grand Meridian Hall" },
    { label: "Users", value: "1,240", trend: "+62", owner: "Aarav Sharma" },
    { label: "Venue Growth", value: "18%", trend: "+8 venues", owner: "Sara Khan" },
    { label: "Platform Commission", value: "Rs 9.2L", trend: "+19%", owner: "All owners" },
    { label: "Dispute Rate", value: "1.8%", trend: "-0.4%", owner: "Support queue" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B49A] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(30,18,10,0.06)]">
      <table className="w-full text-left text-sm text-[#5A3E28]">
        <thead className="border-b border-[#C8B49A] bg-[#FDFAF6] text-[#1E120A]">
          <tr>
            <th className="p-3">▤ Report</th>
            <th className="p-3">▲ Value</th>
            <th className="p-3">◒ Trend</th>
            <th className="p-3">◇ Top Signal</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.label} className="border-b border-[#C8B49A] last:border-0">
              <td className="p-3 font-medium text-[#1E120A]">◆ {report.label}</td>
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
