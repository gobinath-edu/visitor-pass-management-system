import { Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../guards/ProtectedRoute.jsx";
import RoleRoute from "../guards/RoleRoute.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Employees from "../pages/admin/Employees.jsx";
import Users from "../pages/admin/Users.jsx";
import Reports from "../pages/admin/Reports.jsx";
import ActivityHistory from "../pages/admin/ActivityHistory.jsx";
import ReceptionistDashboard from "../pages/receptionist/ReceptionistDashboard.jsx";
import RegisterVisitor from "../pages/receptionist/RegisterVisitor.jsx";
import CheckIn from "../pages/receptionist/CheckIn.jsx";
import CheckOut from "../pages/receptionist/CheckOut.jsx";
import VisitorHistory from "../pages/receptionist/VisitorHistory.jsx";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard.jsx";
import VisitorRequests from "../pages/employee/VisitorRequests.jsx";
import { ROLES } from "../utils/constants.js";
import { useAuth } from "../context/AuthContext.jsx";

function RoleHome() {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  const target = {
    [ROLES.ADMIN]: "/admin",
    [ROLES.RECEPTIONIST]: "/receptionist",
    [ROLES.EMPLOYEE]: "/employee"
  }[user.role];

  return <Navigate to={target} replace />;
}

export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <RoleHome /> },

          {
            element: <RoleRoute roles={[ROLES.ADMIN]} />,
            children: [
              { path: "/admin", element: <AdminDashboard /> },
              { path: "/admin/employees", element: <Employees /> },
              { path: "/admin/users", element: <Users /> },
              { path: "/admin/reports", element: <Reports /> },
              { path: "/admin/activity", element: <ActivityHistory /> }
            ]
          },

          {
            element: <RoleRoute roles={[ROLES.RECEPTIONIST]} />,
            children: [
              { path: "/receptionist", element: <ReceptionistDashboard /> },
              { path: "/receptionist/register", element: <RegisterVisitor /> },
              { path: "/receptionist/check-in", element: <CheckIn /> },
              { path: "/receptionist/check-out", element: <CheckOut /> },
              { path: "/receptionist/history", element: <VisitorHistory /> }
            ]
          },

          {
            element: <RoleRoute roles={[ROLES.EMPLOYEE]} />,
            children: [
              { path: "/employee", element: <EmployeeDashboard /> },
              { path: "/employee/requests", element: <VisitorRequests /> }
            ]
          }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
];
