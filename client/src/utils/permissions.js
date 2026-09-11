import { ROLES } from "./constants.js";

export const navigationByRole = {
  [ROLES.ADMIN]: [
    { label: "Dashboard", path: "/admin" },
    { label: "Employees", path: "/admin/employees" },
    { label: "Users", path: "/admin/users" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Activity", path: "/admin/activity" }
  ],
  [ROLES.RECEPTIONIST]: [
    { label: "Dashboard", path: "/receptionist" },
    { label: "Register Visitor", path: "/receptionist/register" },
    { label: "Check In", path: "/receptionist/check-in" },
    { label: "Check Out", path: "/receptionist/check-out" },
    { label: "Visitor History", path: "/receptionist/history" }
  ],
  [ROLES.EMPLOYEE]: [
    { label: "Dashboard", path: "/employee" },
    { label: "Visitor Requests", path: "/employee/requests" }
  ]
};
