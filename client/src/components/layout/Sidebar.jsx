import { NavLink } from "react-router-dom";
import { navigationByRole } from "../../utils/permissions.js";

export default function Sidebar({ role }) {
  const items = navigationByRole[role] || [];

  return (
    <aside className="sidebar">
      <div className="brand">VisitorPass</div>
      <nav>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
