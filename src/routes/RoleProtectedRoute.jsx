import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
  children,
  allowedRole
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User has the wrong role
  if (user.role !== allowedRole) {
    if (user.role === "candidate") {
      return (
        <Navigate
          to="/candidate-dashboard"
          replace
        />
      );
    }

    if (user.role === "recruiter") {
      return (
        <Navigate
          to="/recruiter-dashboard"
          replace
        />
      );
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleProtectedRoute;