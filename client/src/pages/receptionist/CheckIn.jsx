import { useEffect, useState } from "react";
import { visitorService } from "../../services/visitor.service.js";
import VisitorTable from "../../components/visitors/VisitorTable.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function CheckIn() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    visitorService.list({ status: "APPROVED" })
      .then((r) => setItems(r.data.data.items))
      .catch((e) => setError(e.response?.data?.message || "Failed to load approved visitors"));
  };

  useEffect(load, []);

  const onAction = async (visit) => {
    try {
      await visitorService.checkIn(visit._id);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Check-in failed");
    }
  };

  if (!items) return <Loader />;

  return (
    <>
      <div className="page-header"><div><h2>Check In</h2><p>Only approved visitors can be checked in.</p></div></div>
      <ErrorMessage message={error} />
      <div className="card"><VisitorTable items={items} onAction={onAction} /></div>
    </>
  );
}
