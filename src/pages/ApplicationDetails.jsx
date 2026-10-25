import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState(null);

  const [job, setJob] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    getApplicationDetails();
  }, [id]);

  async function getApplicationDetails() {
    try {
      /* ============================== */
      /* CHECK LOGIN */
      /* ============================== */

      if (!user) {
        navigate("/login");
        return;
      }

      /* ============================== */
      /* GET APPLICATION */
      /* ============================== */

      const applicationResponse =
        await api.get(
          `/applications/${id}`
        );

      const applicationData =
        applicationResponse.data;

      /* ============================== */
      /* SECURITY CHECK */
      /* ============================== */

      if (
        applicationData.applicantEmail !==
        user.email
      ) {
        toast.error(
          "You are not authorized to view this application."
        );

        navigate("/my-applications");

        return;
      }

      setApplication(applicationData);

      /* ============================== */
      /* GET JOB */
      /* ============================== */

      const jobResponse =
        await api.get(
          `/jobs/${applicationData.jobId}`
        );

      setJob(jobResponse.data);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load application details."
      );

      navigate("/my-applications");

    } finally {
      setLoading(false);
    }
  }

  /* ============================== */
  /* DATE FORMAT */
  /* ============================== */

  function formatDate(date) {
    if (!date) {
      return "Not Available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );
  }

  /* ============================== */
  /* LOADING */
  /* ============================== */

  if (loading) {
    return (
      <main className="application-details-page">

        <div className="application-details-loading">

          <div className="loading-spinner"></div>

          <h2>
            Loading Application...
          </h2>

          <p>
            Please wait while we fetch your application.
          </p>

        </div>

      </main>
    );
  }

  /* ============================== */
  /* APPLICATION NOT FOUND */
  /* ============================== */

  if (!application) {
    return (
      <main className="application-details-page">

        <div className="application-details-empty">

          <h2>
            Application Not Found
          </h2>

          <Link
            to="/my-applications"
            className="back-applications-btn"
          >
            Back to My Applications
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="application-details-page">

      <div className="application-details-container">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="application-details-header">

          <div>

            <p className="form-label">
              RECRUITPRO
            </p>

            <h1>
              Application Details
            </h1>

            <p>
              Review the information submitted
              with your application.
            </p>

          </div>

          <span className="details-status">
            {application.status ||
              "Applied"}
          </span>

        </div>


        {/* ================================= */}
        {/* JOB INFORMATION */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Job Information
            </h2>

          </div>


          <div className="job-details-summary">

            {job?.image && (
              <img
                src={job.image}
                alt={job.title}
              />
            )}

            <div>

              <h2>
                {job?.title ||
                  "Job Title"}
              </h2>

              <h3>
                {job?.company ||
                  "Company"}
              </h3>

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
                💰{" "}
                {job?.salary ||
                  "Salary not available"}
              </p>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* APPLICATION STATUS */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Application Status
            </h2>

          </div>


          <div className="status-box">

            <div>

              <span>
                Current Status
              </span>

              <strong>
                {application.status ||
                  "Applied"}
              </strong>

            </div>


            <div>

              <span>
                Applied On
              </span>

              <strong>
                {formatDate(
                  application.appliedDate
                )}
              </strong>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* PERSONAL INFORMATION */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Personal Information
            </h2>

          </div>


          <div className="details-grid">

            <div className="detail-item">

              <span>
                Full Name
              </span>

              <strong>
                {application.fullName ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Email
              </span>

              <strong>
                {application.email ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Phone
              </span>

              <strong>
                {application.phone ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Date of Birth
              </span>

              <strong>
                {application.dateOfBirth ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Gender
              </span>

              <strong>
                {application.gender ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Current Location
              </span>

              <strong>
                {application.currentLocation ||
                  "Not provided"}
              </strong>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* EDUCATION */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Education
            </h2>

          </div>


          <div className="details-grid">

            <div className="detail-item">

              <span>
                Highest Qualification
              </span>

              <strong>
                {application.qualification ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                College / University
              </span>

              <strong>
                {application.college ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Graduation Year
              </span>

              <strong>
                {application.graduationYear ||
                  "Not provided"}
              </strong>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* PROFESSIONAL INFORMATION */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Professional Information
            </h2>

          </div>


          <div className="details-grid">

            <div className="detail-item">

              <span>
                Skills
              </span>

              <strong>
                {application.skills ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Experience
              </span>

              <strong>
                {application.experience ||
                  "Not provided"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Notice Period
              </span>

              <strong>
                {application.noticePeriod ||
                  "Not provided"}
              </strong>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* PROFESSIONAL PROFILES */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Professional Profiles
            </h2>

          </div>


          <div className="profile-links">

            {application.linkedin ? (
              <a
                href={application.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn Profile
              </a>
            ) : (
              <span>
                LinkedIn not provided
              </span>
            )}


            {application.github ? (
              <a
                href={application.github}
                target="_blank"
                rel="noreferrer"
              >
                💻 GitHub Profile
              </a>
            ) : (
              <span>
                GitHub not provided
              </span>
            )}

          </div>

        </section>


        {/* ================================= */}
        {/* RESUME */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Resume
            </h2>

          </div>


          <div className="resume-details">

            <span>
              📎
            </span>

            <div>

              <strong>
                {application.resume ||
                  "Resume not provided"}
              </strong>

              <p>
                Resume submitted with application
              </p>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* COVER LETTER */}
        {/* ================================= */}

        <section className="details-section">

          <div className="details-section-heading">

            <h2>
              Cover Letter
            </h2>

          </div>


          <div className="cover-letter-box">

            {application.coverLetter ||
              "No cover letter provided."}

          </div>

        </section>


        {/* ================================= */}
        {/* ACTIONS */}
        {/* ================================= */}

        <div className="application-details-actions">

          <Link
            to="/my-applications"
            className="back-applications-btn"
          >
            ← Back to My Applications
          </Link>


          {job && (
            <Link
              to={`/jobs/${job.id}`}
              className="view-job-details-btn"
            >
              View Job
            </Link>
          )}

        </div>

      </div>

    </main>
  );
}

export default ApplicationDetails;