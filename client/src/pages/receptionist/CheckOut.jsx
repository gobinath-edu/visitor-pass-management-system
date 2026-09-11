import { useEffect, useState } from "react";
import { visitorService } from "../../services/visitor.service.js";
import VisitorTable from "../../components/visitors/VisitorTable.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function CheckOut() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    visitorService.list({ status: "CHECKED_IN" })
      .then((r) => setItems(r.data.data.items))
      .catch((e) => setError(e.response?.data?.message || "Failed to load checked-in visitors"));
  };

  useEffect(load, []);

  const onAction = async (visit) => {
    try {
      await visitorService.checkOut(visit._id);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Check-out failed");
    }
  };

  if (!items) return <Loader />;

  return (
    <>
      <div className="page-header"><div><h2>Check Out</h2><p>Visitors currently inside the premises.</p></div></div>
      <ErrorMessage message={error} />
      <div className="card"><VisitorTable items={items} onAction={onAction} /></div>
    </>
  );
}
