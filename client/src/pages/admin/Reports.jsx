import { useEffect, useState } from "react";
import { reportService } from "../../services/report.service.js";
import StatCard from "../../components/dashboard/StatCard.jsx";

export default function Reports() {
  const [period, setPeriod] = useState("TODAY");
  const [report, setReport] = useState(null);
  const [range, setRange] = useState({ startDate: "", endDate: "" });

  const load = () => {
    reportService.summary({
      period,
      ...(period === "CUSTOM" ? range : {})
    }).then((r) => setReport(r.data.data.report));
  };

  useEffect(() => {
    if (period !== "CUSTOM") load();
  }, [period]);

  return (
    <>
      <div className="page-header"><div><h2>Visitor Reports</h2><p>Meaningful visitor statistics by date range.</p></div></div>
      <div className="card report-toolbar">
        <select className="input" value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="TODAY">Today</option>
          <option value="WEEK">This Week</option>
          <option value="CUSTOM">Custom Date Range</option>
        </select>
        {period === "CUSTOM" && (
          <>
            <input className="input" type="date" value={range.startDate} onChange={(e) => setRange({ ...range, startDate: e.target.value })} />
            <input className="input" type="date" value={range.endDate} onChange={(e) => setRange({ ...range, endDate: e.target.value })} />
            <button className="btn btn-primary" onClick={load}>Apply</button>
          </>
        )}
      </div>

      {report && (
        <div className="stats-grid">
          <StatCard label="Total" value={report.total} />
          <StatCard label="Pending" value={report.pending} />
          <StatCard label="Approved" value={report.approved} />
          <StatCard label="Rejected" value={report.rejected} />
          <StatCard label="Checked In" value={report.checkedIn} />
          <StatCard label="Checked Out" value={report.checkedOut} />
          <StatCard label="Cancelled" value={report.cancelled} />
        </div>
      )}
    </>
  );
}
