
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  BriefcaseBusiness,
  UserRound,
  LayoutDashboard,
  FileCheck2,
  Heart,
  Settings2,
  LogOut,
  ChevronRight,
  Plus,
} from "lucide-react";

function Navbar() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const favorites = useSelector((state) => state.favorites);

  // Sync the account whenever the URL changes or login state changes.
  useEffect(() => {
    function syncUser() {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, [location.pathname]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login", { replace: true });
  }

  const isRecruiter = user?.role === "recruiter";
  const dashboardPath = isRecruiter
    ? "/recruiter-dashboard"
    : "/candidate-dashboard";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Recruit<span>Pro</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-icon-link">
          <Home size={18} />
          <span>Home</span>
        </Link>

        <Link to="/jobs" className="nav-icon-link">
          <BriefcaseBusiness size={18} />
          <span>Jobs</span>
        </Link>

        {!user ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login" className="nav-login">Login</Link>
          </>
        ) : (
          <div className="account-menu" ref={menuRef}>
            <button
              type="button"
              className={`account-trigger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open account menu"
              aria-expanded={menuOpen}
            >
              <span className="trigger-avatar">
                {(user.name || "U").charAt(0).toUpperCase()}
              </span>
              <span className="trigger-name">
                {user.name?.split(" ")[0] || "Account"}
              </span>
              <span className="trigger-dots">⋮</span>
            </button>

            {menuOpen && (
              <div className="account-dropdown">
                <div className="dropdown-profile">
                  <div className="dropdown-avatar">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </div>

                  <div className="dropdown-identity">
                    <strong>{user.name || "User"}</strong>
                    <span>{user.email}</span>
                    <span className="role-badge">
                      {isRecruiter ? "Recruiter" : "Candidate"}
                    </span>
                  </div>
                </div>

                <div className="dropdown-divider" />
                <p className="dropdown-label">YOUR WORKSPACE</p>

                <Link
                  to={dashboardPath}
                  className="dropdown-item"
                  onClick={closeMenu}
                >
                  <span className="dropdown-icon">
                    <LayoutDashboard size={18} />
                  </span>
                  <span className="dropdown-item-text">
                    <strong>Dashboard</strong>
                    <small>Your overview and activity</small>
                  </span>
                  <ChevronRight size={16} className="dropdown-chevron" />
                </Link>

                {isRecruiter ? (
                  <Link
                    to="/add-job"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    <span className="dropdown-icon"><Plus size={18} /></span>
                    <span className="dropdown-item-text">
                      <strong>Add a Job</strong>
                      <small>Publish a new opportunity</small>
                    </span>
                    <ChevronRight size={16} className="dropdown-chevron" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/candidate-profile"
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <span className="dropdown-icon">
                        <UserRound size={18} />
                      </span>
                      <span className="dropdown-item-text">
                        <strong>My Profile</strong>
                        <small>Your professional information</small>
                      </span>
                      <ChevronRight size={16} className="dropdown-chevron" />
                    </Link>

                    <Link
                      to="/my-applications"
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <span className="dropdown-icon">
                        <FileCheck2 size={18} />
                      </span>
                      <span className="dropdown-item-text">
                        <strong>My Applications</strong>
                        <small>Track your applications</small>
                      </span>
                      <ChevronRight size={16} className="dropdown-chevron" />
                    </Link>

                    <Link
                      to="/favorites"
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <span className="dropdown-icon">
                        <Heart size={18} />
                      </span>
                      <span className="dropdown-item-text">
                        <strong>Saved Jobs</strong>
                        <small>{favorites.length} jobs saved</small>
                      </span>
                      <ChevronRight size={16} className="dropdown-chevron" />
                    </Link>
                  </>
                )}

                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={closeMenu}
                >
                  <span className="dropdown-icon">
                    <Settings2 size={18} />
                  </span>
                  <span className="dropdown-item-text">
                    <strong>Settings</strong>
                    <small>Manage your preferences</small>
                  </span>
                  <ChevronRight size={16} className="dropdown-chevron" />
                </Link>

                <div className="dropdown-divider" />

                <button
                  type="button"
                  className="dropdown-logout"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
