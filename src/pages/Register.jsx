
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BriefcaseBusiness } from "lucide-react";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("/users");

      const existingUser = response.data.find(
        (user) =>
          user.email?.trim().toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        alert("This email is already registered. Please log in.");
        return;
      }

      const newUser = {
        name: trimmedName,
        email: normalizedEmail,
        password,
        role: "candidate",
      };

      const createResponse = await api.post("/users", newUser);
      const registeredUser = createResponse.data;

      localStorage.setItem("user", JSON.stringify(registeredUser));
      window.dispatchEvent(new Event("auth-change"));

      navigate("/candidate-dashboard", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to register. Please check whether JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <section className="auth-card register-card">
        <div className="auth-brand-icon">
          <BriefcaseBusiness size={25} />
        </div>

        <p className="form-label">RECRUITPRO</p>
        <h1>Create Account</h1>
        <p className="auth-description">
          Build your profile and discover new opportunities.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="auth-field-label" htmlFor="register-name">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <label className="auth-field-label" htmlFor="register-email">
            Email Address
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="auth-field-label" htmlFor="register-password">
            Password
          </label>
          <div className="password-input-container">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
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

          <label className="auth-field-label" htmlFor="register-confirm-password">
            Confirm Password
          </label>
          <div className="password-input-container">
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="password-eye"
              onClick={() =>
                setShowConfirmPassword((previous) => !previous)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </p>
      </section>
    </main>
  );
}

export default Register;
