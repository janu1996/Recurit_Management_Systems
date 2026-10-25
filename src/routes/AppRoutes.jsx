
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import ApplyJob from "../pages/ApplyJob";
import MyApplications from "../pages/MyApplications";
import ApplicationDetails from "../pages/ApplicationDetails";
import CandidateDashboard from "../pages/CandidateDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CandidateProfile from "../pages/CandidateProfile";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate-dashboard"
        element={
          <RoleProtectedRoute allowedRole="candidate">
            <CandidateDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/recruiter-dashboard"
        element={
          <RoleProtectedRoute allowedRole="recruiter">
            <RecruiterDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/add-job"
        element={
          <RoleProtectedRoute allowedRole="recruiter">
            <AddJob />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <RoleProtectedRoute allowedRole="recruiter">
            <EditJob />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/apply/:id"
        element={
          <RoleProtectedRoute allowedRole="candidate">
            <ApplyJob />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <RoleProtectedRoute allowedRole="candidate">
            <MyApplications />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/application/:id"
        element={
          <RoleProtectedRoute allowedRole="candidate">
            <ApplicationDetails />
          </RoleProtectedRoute>
        }
      />

      <Route
  path="/candidate-profile"
  element={
    <RoleProtectedRoute allowedRole="candidate">
      <CandidateProfile />
    </RoleProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;
