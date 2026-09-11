import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand large">VisitorPass</div>
        <h1>Sign in</h1>
        <p className="muted">Use your assigned role account to continue.</p>
        <ErrorMessage message={error} />
        <form onSubmit={submit} className="stack">
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" loading={loading}>Sign in</Button>
        </form>
      </div>
    </div>
  );
}
