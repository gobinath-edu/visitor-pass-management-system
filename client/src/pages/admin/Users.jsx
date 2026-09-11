import { useEffect, useState } from "react";
import { employeeService } from "../../services/employee.service.js";

export default function Users() {
  const [users, setUsers] = useState([]);

  const load = () => employeeService.users().then((r) => setUsers(r.data.data.users));
  useEffect(load, []);

  const toggle = async (user) => {
    await employeeService.updateUserStatus(user._id, !user.isActive);
    load();
  };

  return (
    <>
      <div className="page-header"><div><h2>User Accounts</h2><p>Manage account activation state.</p></div></div>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th /></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                <td>{u.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button className="link-button" onClick={() => toggle(u)}>
                    {u.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
