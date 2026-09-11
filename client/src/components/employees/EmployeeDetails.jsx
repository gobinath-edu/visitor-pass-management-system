import Modal from "../common/Modal.jsx";
import { formatDateTime } from "../../utils/formatters.js";
export default function EmployeeDetails({ employee, open, onClose }) {
  if (!employee) return null;
  return <Modal open={open} title="Employee Details" onClose={onClose}><div className="details-grid"><div><span>Name</span><strong>{employee.user?.name}</strong></div><div><span>Email</span><strong>{employee.user?.email}</strong></div><div><span>Employee code</span><strong>{employee.employeeCode}</strong></div><div><span>Department</span><strong>{employee.department}</strong></div><div><span>Phone</span><strong>{employee.phone||"-"}</strong></div><div><span>Created</span><strong>{formatDateTime(employee.createdAt)}</strong></div></div></Modal>;
}
