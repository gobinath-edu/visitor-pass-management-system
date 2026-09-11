import VisitorStatusBadge from "../visitors/VisitorStatusBadge.jsx";
import { formatDate } from "../../utils/formatters.js";
export default function VisitorReportTable({ items=[] }) { return <div className="table-wrap"><table><thead><tr><th>Visitor</th><th>Employee</th><th>Date</th><th>Status</th></tr></thead><tbody>{items.map(item=><tr key={item._id}><td>{item.visitor?.fullName}</td><td>{item.employee?.user?.name||"-"}</td><td>{formatDate(item.visitDate)}</td><td><VisitorStatusBadge status={item.status}/></td></tr>)}</tbody></table></div>; }
