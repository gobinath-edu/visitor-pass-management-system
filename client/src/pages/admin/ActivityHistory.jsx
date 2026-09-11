import { useEffect, useState } from "react";
import { activityService } from "../../services/activity.service.js";
import ActivityTable from "../../components/activity/ActivityTable.jsx";
import ActivityDetails from "../../components/activity/ActivityDetails.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function ActivityHistory() {
  const [logs, setLogs] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    activityService
      .list()
      .then((response) => setLogs(response.data.data.logs))
      .catch((err) => setError(err.response?.data?.message || "Failed to load activity history"));
  }, []);

  if (!logs) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Activity History</h2>
          <p>Audit trail for visitor requests and status changes.</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="card">
        {logs.length ? (
          <ActivityTable logs={logs} onSelect={setSelectedLog} />
        ) : (
          <div className="empty-state">No activity recorded yet.</div>
        )}
      </div>

      <ActivityDetails
        log={selectedLog}
        open={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
      />
    </>
  );
}