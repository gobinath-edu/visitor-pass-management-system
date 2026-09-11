import Input from "../common/Input.jsx";
import Select from "../common/Select.jsx";
import { VISIT_STATUS } from "../../utils/constants.js";

export default function VisitorFilters({ filters, setFilters }) {
  return (
    <div className="filter-grid">
      <Input
        label="Visitor name"
        value={filters.visitorName}
        onChange={(e) => setFilters({ ...filters, visitorName: e.target.value })}
      />
      <Input
        label="Employee name"
        value={filters.employeeName}
        onChange={(e) => setFilters({ ...filters, employeeName: e.target.value })}
      />
      <Input
        label="Visit date"
        type="date"
        value={filters.visitDate}
        onChange={(e) => setFilters({ ...filters, visitDate: e.target.value })}
      />
      <Select
        label="Status"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All statuses</option>
        {Object.values(VISIT_STATUS).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
    </div>
  );
}
