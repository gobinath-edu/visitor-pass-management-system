import StatCard from "../dashboard/StatCard.jsx";

export default function ReportSummary({ report }) {
  if (!report) return null;

  return (
    <div className="stats-grid">
      <StatCard label="Total" value={report.total} />
      <StatCard label="Pending" value={report.pending} />
      <StatCard label="Approved" value={report.approved} />
      <StatCard label="Rejected" value={report.rejected} />
      <StatCard label="Checked In" value={report.checkedIn} />
      <StatCard label="Checked Out" value={report.checkedOut} />
      <StatCard label="Cancelled" value={report.cancelled} />
    </div>
  );
}