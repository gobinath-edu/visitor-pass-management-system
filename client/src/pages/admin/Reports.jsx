import { useEffect, useState } from "react";
import { reportService } from "../../services/report.service.js";
import ReportFilters from "../../components/reports/ReportFilters.jsx";
import ReportSummary from "../../components/reports/ReportSummary.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function Reports() {
  const [period, setPeriod] = useState("TODAY");
  const [report, setReport] = useState(null);
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (period === "CUSTOM" && (!range.startDate || !range.endDate)) {
      setError("Select both start and end dates");
      return;
    }

    if (period === "CUSTOM" && range.startDate > range.endDate) {
      setError("Start date cannot be after end date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await reportService.summary({
        period,
        ...(period === "CUSTOM" ? range : {})
      });
      setReport(response.data.data.report);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (period !== "CUSTOM") load();
  }, [period]);

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Visitor Reports</h2>
          <p>Review visitor statistics for today, this week, or a custom range.</p>
        </div>
      </div>

      <div className="card report-toolbar">
        <ReportFilters
          period={period}
          setPeriod={setPeriod}
          range={range}
          setRange={setRange}
          onApply={load}
        />
      </div>

      <ErrorMessage message={error} />

      {loading ? <Loader /> : <ReportSummary report={report} />}
    </>
  );
}
