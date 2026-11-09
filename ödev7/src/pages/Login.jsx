
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../api/authApi";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await login(username, password);

      loginUser(user);

      const destination = location.state?.from || "/";

      navigate(destination, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Student Email</label>

        <input
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your student email"
          required
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <p>Demo password: demo123456</p>
    </section>
  );
}
