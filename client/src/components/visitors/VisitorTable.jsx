import VisitorStatusBadge from "./VisitorStatusBadge.jsx";
import { formatDate } from "../../utils/formatters.js";

export default function VisitorTable({ items, onAction }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Arrival</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((visit) => (
            <tr key={visit._id}>
              <td>
                <strong>{visit.visitor?.fullName}</strong>
                <small>{visit.visitor?.phone}</small>
              </td>
              <td>{visit.employee?.user?.name || "-"}</td>
              <td>{formatDate(visit.visitDate)}</td>
              <td>{visit.expectedArrivalTime}</td>
              <td><VisitorStatusBadge status={visit.status} /></td>
              <td>
                {onAction && <button className="link-button" onClick={() => onAction(visit)}>Open</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
