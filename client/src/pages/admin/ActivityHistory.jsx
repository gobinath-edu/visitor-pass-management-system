import { useEffect, useState } from "react";
import { activityService } from "../../services/activity.service.js";
import { formatDateTime } from "../../utils/formatters.js";

export default function ActivityHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    activityService.list().then((r) => setLogs(r.data.data.logs));
  }, []);

  return (
    <>
      <div className="page-header"><div><h2>Activity History</h2><p>Audit trail for visitor requests.</p></div></div>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Action</th><th>Visitor</th><th>User</th><th>Date & Time</th></tr></thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.action}</td>
                <td>{log.visit?.visitor?.fullName || "-"}</td>
                <td>{log.performedBy?.name || "-"}</td>
                <td>{formatDateTime(log.performedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
