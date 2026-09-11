import { useEffect, useState } from "react";
import { employeeService } from "../../services/employee.service.js";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await employeeService.users();
      setUsers(response.data.data.users || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load user accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (user) => {
    try {
      setError("");

      await employeeService.updateUserStatus(
        user._id,
        !user.isActive
      );

      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update user status."
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>User Accounts</h2>
          <p>Manage account activation state.</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No user accounts found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    {user.isActive ? "Active" : "Inactive"}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => toggle(user)}
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}