import { useAuth } from "../../context/AuthContext.jsx";
export default function Navbar() {
  const { user } = useAuth();
  return <div className="navbar"><strong>Visitor Pass Management</strong><span>{user?.role || ""}</span></div>;
}
