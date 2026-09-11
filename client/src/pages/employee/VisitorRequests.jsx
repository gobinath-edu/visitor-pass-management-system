import { useEffect, useState } from "react";
import { requestService } from "../../services/request.service.js";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import VisitorStatusBadge from "../../components/visitors/VisitorStatusBadge.jsx";
import { formatDate } from "../../utils/formatters.js";

export default function VisitorRequests() {
  const [requests, setRequests] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [error, setError] = useState("");

  const load = () => {
    requestService.list().then((r) => setRequests(r.data.data.items)).catch((e) => setError(e.response?.data?.message || "Failed to load requests"));
  };

  useEffect(load, []);

  const act = async (id, type) => {
    try {
      setError("");
      if (type === "approve") await requestService.approve(id, remarks[id] || "");
      else await requestService.reject(id, remarks[id] || "");
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Action failed");
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Visitor Requests</h2>
          <p>Review requests assigned to you.</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="stack">
        {requests.length === 0 && <div className="card">No pending requests.</div>}
        {requests.map((visit) => (
          <article className="card request-card" key={visit._id}>
            <div className="request-head">
              <div>
                <h3>{visit.visitor?.fullName}</h3>
                <p>{visit.visitor?.phone} · {visit.purpose}</p>
              </div>
              <VisitorStatusBadge status={visit.status} />
            </div>
            <div className="request-meta">
              <span><strong>Date:</strong> {formatDate(visit.visitDate)}</span>
              <span><strong>Arrival:</strong> {visit.expectedArrivalTime}</span>
              <span><strong>Company:</strong> {visit.visitor?.company || "-"}</span>
            </div>
            <Input
              label="Remarks"
              value={remarks[visit._id] || ""}
              onChange={(e) => setRemarks({ ...remarks, [visit._id]: e.target.value })}
            />
            <div className="actions">
              <Button onClick={() => act(visit._id, "approve")}>Approve</Button>
              <Button variant="danger" onClick={() => act(visit._id, "reject")}>Reject</Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
