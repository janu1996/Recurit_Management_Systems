
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const APPLICATION_STATUSES = [
  "Applied",
  "Shortlisted",
  "Rejected",
  "Selected",
];

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [jobsResponse, applicationsResponse] =
        await Promise.all([
          api.get("/jobs"),
          api.get("/applications"),
        ]);

      setJobs(jobsResponse.data);
      setApplications(applicationsResponse.data);
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError("Unable to load dashboard. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  }

  async function updateApplicationStatus(application, newStatus) {
    try {
      setUpdatingId(application.id);
      setError("");
      setSuccess("");

      // Save the new status to JSON Server.
      const response = await api.patch(
        `/applications/${application.id}`,
        { status: newStatus }
      );

      // Update the application displayed on the dashboard.
      setApplications((previousApplications) =>
        previousApplications.map((item) =>
          String(item.id) === String(application.id)
            ? { ...item, ...response.data }
            : item
        )
      );

      setSuccess(
        `Application status updated to "${newStatus}".`
      );
    } catch (err) {
      console.error("Status update error:", err);
      setError("Could not update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  const pendingCount = applications.filter(
    (application) =>
      !application.status ||
      application.status === "Applied" ||
      application.status === "Pending"
  ).length;

  if (loading) {
    return (
      <main className="recruiter-dashboard">
        <p>Loading recruiter dashboard...</p>
      </main>
    );
  }

  const recentApplications = [...applications]
    .reverse()
    .slice(0, 5);

  return (
    <main className="recruiter-dashboard">
      <h1>Recruiter Dashboard</h1>

      <p>Manage job postings and review applications.</p>

      {error && (
        <p role="alert" className="dashboard-error">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="dashboard-success">
          {success}
        </p>
      )}

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <h3>Total Jobs</h3>
          <p>{jobs.length}</p>
        </div>

        <div className="dashboard-stat-card">
          <h3>Total Applications</h3>
          <p>{applications.length}</p>
        </div>

        <div className="dashboard-stat-card">
          <h3>Pending Applications</h3>
          <p>{pendingCount}</p>
        </div>
      </div>

      <section className="dashboard-actions">
        <h2>Quick Actions</h2>

        <Link to="/add-job" className="dashboard-action-link">
          Add a Job
        </Link>

        <Link to="/jobs" className="dashboard-action-link">
          View Job Listings
        </Link>
      </section>

      <section>
        <h2>Recent Applications</h2>

        {applications.length === 0 ? (
          <p>No applications have been submitted yet.</p>
        ) : (
          <div className="recruiter-applications">
            {recentApplications.map((application) => {
              const currentStatus =
                application.status || "Applied";

              return (
                <article
                  key={application.id}
                  className="recruiter-application-card"
                >
                  <h3>
                    {application.applicantName ||
                      application.fullName ||
                      "Candidate"}
                  </h3>

                  <p>
                    Email:{" "}
                    {application.applicantEmail ||
                      application.email ||
                      "Not provided"}
                  </p>

                  <p>Job ID: {application.jobId}</p>

                  <p>
                    Current Status: <strong>{currentStatus}</strong>
                  </p>

                  <label htmlFor={`status-${application.id}`}>
                    Update Application Status
                  </label>

                  <select
                    id={`status-${application.id}`}
                    value={currentStatus}
                    disabled={updatingId === application.id}
                    onChange={(event) =>
                      updateApplicationStatus(
                        application,
                        event.target.value
                      )
                    }
                  >
                    {APPLICATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {updatingId === application.id && (
                    <p>Saving status...</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default RecruiterDashboard;
