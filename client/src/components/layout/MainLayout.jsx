import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar role={user.role} />
      <div className="main-area">
        <Topbar />
        <main className="content">
          <div className="page-wrap">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
