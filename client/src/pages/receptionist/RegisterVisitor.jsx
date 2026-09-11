import { useEffect, useState } from "react";
import { employeeService } from "../../services/employee.service.js";
import { visitorService } from "../../services/visitor.service.js";
import Input from "../../components/common/Input.jsx";
import Select from "../../components/common/Select.jsx";
import Button from "../../components/common/Button.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { validateVisitorForm } from "../../utils/validators.js";

const initial = {
  fullName: "",
  phone: "",
  email: "",
  idType: "",
  idNumber: "",
  company: "",
  employeeId: "",
  visitDate: "",
  expectedArrivalTime: "",
  purpose: ""
};

export default function RegisterVisitor() {
  const [form, setForm] = useState(initial);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    employeeService.list().then((r) => setEmployees(r.data.data.employees.filter((e) => e.isActive && e.user?.isActive)));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    const nextErrors = validateVisitorForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await visitorService.create(form);
      setForm(initial);
      setSuccess("Visitor request created successfully.");
    } catch (err) {
      setServerError(err.response?.data?.message || "Could not create visitor request");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Register Visitor</h2>
          <p>Create a visit request for employee approval.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      <ErrorMessage message={serverError} />

      <form className="card form-grid" onSubmit={submit}>
        <Input label="Visitor name" value={form.fullName} error={errors.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <Input label="Phone" value={form.phone} error={errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <Input label="ID type" value={form.idType} onChange={(e) => setForm({ ...form, idType: e.target.value })} />
        <Input label="ID number" value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />

        <Select label="Employee to visit" value={form.employeeId} error={errors.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required>
          <option value="">Select employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.user?.name} — {employee.department}
            </option>
          ))}
        </Select>

        <Input label="Visit date" type="date" value={form.visitDate} error={errors.visitDate} onChange={(e) => setForm({ ...form, visitDate: e.target.value })} required />
        <Input label="Expected arrival" type="time" value={form.expectedArrivalTime} error={errors.expectedArrivalTime} onChange={(e) => setForm({ ...form, expectedArrivalTime: e.target.value })} required />
        <div className="field full">
          <label>Purpose of visit</label>
          <textarea className="input textarea" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
          {errors.purpose && <small className="field-error">{errors.purpose}</small>}
        </div>

        <div className="form-actions full">
          <Button type="submit" loading={saving}>Create Request</Button>
        </div>
      </form>
    </>
  );
}
