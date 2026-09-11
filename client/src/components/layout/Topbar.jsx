import { useAuth } from "../../context/AuthContext.jsx";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>
        <h1>Visitor Pass Management</h1>
        <span>{user?.role}</span>
      </div>
      <div className="topbar-user">
        <div>
          <strong>{user?.name}</strong>
          <small>{user?.email}</small>
        </div>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
