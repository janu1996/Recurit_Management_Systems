
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BriefcaseBusiness } from "lucide-react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.get("/users");
      const enteredEmail = email.trim().toLowerCase();

      const loggedInUser = response.data.find(
        (user) =>
          user.email?.trim().toLowerCase() === enteredEmail &&
          user.password === password
      );

      if (!loggedInUser) {
        alert("Invalid email or password.");
        return;
      }

      if (!["candidate", "recruiter"].includes(loggedInUser.role)) {
        alert("Your account role is not recognized.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      window.dispatchEvent(new Event("auth-change"));

      navigate(
        loggedInUser.role === "candidate"
          ? "/candidate-dashboard"
          : "/recruiter-dashboard",
        { replace: true }
      );
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect. Please make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <section className="auth-card">
        <div className="auth-brand-icon">
          <BriefcaseBusiness size={25} />
        </div>

        <p className="form-label">RECRUITPRO</p>
        <h1>Welcome Back</h1>
        <p className="auth-description">
          Sign in to continue your career journey.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="auth-field-label" htmlFor="login-email">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="auth-field-label" htmlFor="login-password">
            Password
          </label>
          <div className="password-input-container">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-eye"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch-text">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;
