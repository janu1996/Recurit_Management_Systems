import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    getApplications();
  }, []);

  async function getApplications() {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      // Get all applications
      const applicationResponse =
        await api.get("/applications");

      // Get all jobs
      const jobResponse =
        await api.get("/jobs");

      // Show only logged-in user's applications
      const userApplications =
        applicationResponse.data.filter(
          (application) =>
            application.applicantEmail ===
            user.email
        );

      setApplications(userApplications);
      setJobs(jobResponse.data);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load your applications."
      );
    } finally {
      setLoading(false);
    }
  }

  // Find the job using jobId
  function getJob(jobId) {
    return jobs.find(
      (job) =>
        String(job.id) === String(jobId)
    );
  }

  // Format application date
  function formatDate(date) {
    if (!date) {
      return "Not Available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  }

  // =========================================
  // USER NOT LOGGED IN
  // =========================================

  if (!user) {
    return (
      <main className="applications-page">

        <div className="applications-empty">

          <div className="empty-icon">
            🔐
          </div>

          <h1>
            Please Login
          </h1>

          <p>
            Login to view your applications.
          </p>

          <Link
            to="/login"
            className="applications-login-btn"
          >
            Login
          </Link>

        </div>

      </main>
    );
  }

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="applications-page">

        <div className="applications-loading">

          <div className="loading-spinner"></div>

          <h2>
            Loading Applications...
          </h2>

          <p>
            Please wait while we fetch your applications.
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="applications-page">

      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <div className="applications-header">

        <p className="form-label">
          RECRUITPRO
        </p>

        <h1>
          My Applications
        </h1>

        <p>
          Track all the jobs you have applied for.
        </p>

      </div>


      {/* ================================= */}
      {/* APPLICATION COUNT */}
      {/* ================================= */}

      {applications.length > 0 && (
        <div className="application-count">

          <span>
            {applications.length}
          </span>

          <p>
            {applications.length === 1
              ? "Job Application"
              : "Job Applications"}
          </p>

        </div>
      )}


      {/* ================================= */}
      {/* NO APPLICATIONS */}
      {/* ================================= */}

      {applications.length === 0 ? (

        <div className="applications-empty">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No Applications Yet
          </h2>

          <p>
            You haven't applied for any jobs yet.
          </p>

          <Link
            to="/jobs"
            className="applications-login-btn"
          >
            Explore Jobs
          </Link>

        </div>

      ) : (

        /* ================================= */
        /* APPLICATION CARDS */
        /* ================================= */

        <div className="applications-grid">

          {applications.map(
            (application) => {

              const job = getJob(
                application.jobId
              );

              return (
                <div
                  className="application-card"
                  key={application.id}
                >

                  {/* ========================= */}
                  {/* JOB IMAGE */}
                  {/* ========================= */}

                  <div className="application-image">

                    <img
                      src={
                        job?.image ||
                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                      }
                      alt={
                        job?.title ||
                        "Job"
                      }
                    />

                  </div>


                  {/* ========================= */}
                  {/* CARD CONTENT */}
                  {/* ========================= */}

                  <div className="application-content">

                    {/* STATUS */}

                    <div className="application-top">

                      <span className="application-status">
                        {application.status ||
                          "Applied"}
                      </span>

                    </div>


                    {/* JOB TITLE */}

                    <h2>
                      {job?.title ||
                        "Job Title"}
                    </h2>


                    {/* COMPANY */}

                    <h3>
                      {job?.company ||
                        "Company"}
                    </h3>


                    {/* JOB INFORMATION */}

                    <div className="application-info">

                      <p>
                        📍{" "}
                        {job?.location ||
                          "Location not available"}
                      </p>

                      <p>
                        💼{" "}
                        {job?.type ||
                          "Job Type"}
                      </p>

                      <p>
                        🎓{" "}
                        {application.qualification ||
                          "Not provided"}
                      </p>

                      <p>
                        💻{" "}
                        {application.experience ||
                          "Not provided"}
                      </p>

                      <p>
                        🗓️ Applied on{" "}
                        {formatDate(
                          application.appliedDate
                        )}
                      </p>

                    </div>


                    {/* ========================= */}
                    {/* RESUME */}
                    {/* ========================= */}

                    {application.resume && (
                      <div className="resume-name">

                        📎{" "}
                        {application.resume}

                      </div>
                    )}


                    {/* ========================= */}
                    {/* ACTION BUTTONS */}
                    {/* ========================= */}

                    <div className="application-button-group">

  <Link
    to={`/application/${application.id}`}
    className="view-application-btn"
  >
    View Application
  </Link>

  <Link
    to={`/jobs/${application.jobId}`}
    className="view-job-btn-secondary"
  >
    View Job
  </Link>

</div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </main>
  );
}

export default MyApplications;