import { useEffect, useState } from "react";
import { employeeService } from "../../services/employee.service.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const empty = { name: "", email: "", password: "", employeeCode: "", department: "", phone: "" };

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const load = () => employeeService.list().then((r) => setEmployees(r.data.data.employees));
  useEffect(() => { load().catch(() => setError("Failed to load employees")); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await employeeService.create(form);
      setForm(empty);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create employee");
    }
  };

  const deactivate = async (id) => {
    await employeeService.remove(id);
    load();
  };

  return (
    <>
      <div className="page-header"><div><h2>Employees</h2><p>Manage employee accounts and profiles.</p></div></div>
      <ErrorMessage message={error} />
      <form className="card form-grid" onSubmit={submit}>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Input label="Employee code" value={form.employeeCode} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} required />
        <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <div className="form-actions full"><Button type="submit">Add Employee</Button></div>
      </form>

      <div className="card table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Code</th><th>Department</th><th>Status</th><th /></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e._id}>
                <td>{e.user?.name}</td>
                <td>{e.user?.email}</td>
                <td>{e.employeeCode}</td>
                <td>{e.department}</td>
                <td>{e.isActive ? "Active" : "Inactive"}</td>
                <td>{e.isActive && <button className="link-button danger-text" onClick={() => deactivate(e._id)}>Deactivate</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
