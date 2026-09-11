import { useEffect, useState } from "react";
import { visitorService } from "../../services/visitor.service.js";
import StatCard from "../../components/dashboard/StatCard.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    visitorService.dashboardStats().then((r) => setStats(r.data.data.stats));
  }, []);

  if (!stats) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Employee Dashboard</h2>
          <p>Requests and upcoming visitor activity.</p>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard label="Pending Requests" value={stats.pending} />
        <StatCard label="Today's Visitors" value={stats.todayVisitors} />
        <StatCard label="Scheduled Visitors" value={stats.scheduled} />
      </div>
    </>
  );
}
