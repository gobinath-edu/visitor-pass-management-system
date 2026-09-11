import { useEffect, useState } from "react";
import { visitorService } from "../../services/visitor.service.js";
import VisitorTable from "../../components/visitors/VisitorTable.jsx";
import VisitorFilters from "../../components/visitors/VisitorFilters.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function VisitorHistory() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    visitorName: "",
    employeeName: "",
    visitDate: "",
    status: ""
  });

  useEffect(() => {
    setError("");
    visitorService.list(filters)
      .then((r) => setItems(r.data.data.items))
      .catch((e) => setError(e.response?.data?.message || "Failed to load visitor history"));
  }, [filters]);

  if (!items) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Visitor History</h2>
          <p>Search by visitor, employee, date, or status.</p>
        </div>
      </div>
      <div className="card">
        <VisitorFilters filters={filters} setFilters={setFilters} />
      </div>
      <ErrorMessage message={error} />
      <div className="card">
        {items.length ? <VisitorTable items={items} /> : <p>No visitors found.</p>}
      </div>
    </>
  );
}
