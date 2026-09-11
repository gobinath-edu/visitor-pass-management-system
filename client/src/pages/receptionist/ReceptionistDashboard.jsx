import { useEffect, useState } from "react";
import { visitorService } from "../../services/visitor.service.js";
import StatCard from "../../components/dashboard/StatCard.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function ReceptionistDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    visitorService.dashboardStats().then((r) => setStats(r.data.data.stats));
  }, []);

  if (!stats) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Reception Dashboard</h2>
          <p>Front-desk operations at a glance.</p>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard label="Pending Requests" value={stats.pending} />
        <StatCard label="Today's Visitors" value={stats.todayVisitors} />
        <StatCard label="Currently Inside" value={stats.inside} />
        <StatCard label="Scheduled Visitors" value={stats.scheduled} />
      </div>
    </>
  );
}
