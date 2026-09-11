import Modal from "../common/Modal.jsx";
import { formatDateTime } from "../../utils/formatters.js";
export default function ActivityDetails({ log, open, onClose }) {
  if (!log) return null;
  return <Modal open={open} title="Activity Details" onClose={onClose}><div className="details-grid"><div><span>Action</span><strong>{log.action}</strong></div><div><span>User</span><strong>{log.performedBy?.name || "-"}</strong></div><div><span>Date & Time</span><strong>{formatDateTime(log.performedAt)}</strong></div><div className="full"><span>Metadata</span><pre className="metadata">{JSON.stringify(log.metadata || {}, null, 2)}</pre></div></div></Modal>;
}
