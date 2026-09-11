import { formatDateTime } from "../../utils/formatters.js";
export default function ActivityTable({ logs = [], onSelect }) {
  return <div className="table-wrap"><table><thead><tr><th>Action</th><th>Visitor</th><th>User</th><th>Date & Time</th>{onSelect && <th />}</tr></thead><tbody>{logs.map((log)=><tr key={log._id}><td>{log.action.replaceAll("_"," ")}</td><td>{log.visit?.visitor?.fullName || "-"}</td><td>{log.performedBy?.name || "-"}</td><td>{formatDateTime(log.performedAt)}</td>{onSelect && <td><button className="link-button" onClick={()=>onSelect(log)}>View</button></td>}</tr>)}</tbody></table></div>;
}
