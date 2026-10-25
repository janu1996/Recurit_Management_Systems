import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/api";
import toast from "react-hot-toast";

function CandidateDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const favorites = useSelector(
    (state) => state.favorites
  );

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications();
  }, []);

  async function getApplications() {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      const response = await api.get(
        "/applications"
      );

      const userApplications =
        response.data.filter(
          (application) =>
            application.applicantEmail ===
            user.email
        );

      setApplications(userApplications);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load application data."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-empty">
          <h2>Please Login</h2>

          <p>
            Login to access your candidate dashboard.
          </p>

          <Link
            to="/login"
            className="dashboard-btn"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="candidate-dashboard">

      {/* Header */}

      <section className="dashboard-welcome">

        <div>
          <p className="form-label">
            RECRUITPRO
          </p>

          <h1>
            Welcome, {user.name} 👋
          </h1>

          <p>
            Find opportunities and manage your
            job applications from one place.
          </p>
        </div>

        <div className="dashboard-role">
          Candidate
        </div>

      </section>


      {/* Statistics */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon">
            📄
          </div>

          <div>
            <h2>
              {loading
                ? "..."
                : applications.length}
            </h2>

            <p>
              Total Applications
            </p>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            ❤️
          </div>

          <div>
            <h2>
              {favorites.length}
            </h2>

            <p>
              Favorite Jobs
            </p>
          </div>

        </div>

      </section>


      {/* Quick Actions */}

      <section className="dashboard-section">

        <div className="dashboard-section-heading">

          <p className="form-label">
            QUICK ACTIONS
          </p>

          <h2>
            What would you like to do?
          </h2>

          <p>
            Quickly access the most important
            candidate features.
          </p>

        </div>


        <div className="dashboard-actions">

          <Link
            to="/jobs"
            className="dashboard-action-card"
          >

            <div className="action-icon">
              🔎
            </div>

            <h3>
              Browse Jobs
            </h3>

            <p>
              Search and explore available
              job opportunities.
            </p>

            <span>
              Explore Jobs →
            </span>

          </Link>


          <Link
            to="/my-applications"
            className="dashboard-action-card"
          >

            <div className="action-icon">
              📋
            </div>

            <h3>
              My Applications
            </h3>

            <p>
              View and track your submitted
              job applications.
            </p>

            <span>
              View Applications →
            </span>

          </Link>


          <Link
            to="/favorites"
            className="dashboard-action-card"
          >

            <div className="action-icon">
              ❤️
            </div>

            <h3>
              Favorite Jobs
            </h3>

            <p>
              View the jobs you saved for
              future consideration.
            </p>

            <span>
              View Favorites →
            </span>

          </Link>

        </div>

      </section>


      {/* Recent Applications */}

      <section className="dashboard-section">

        <div className="dashboard-section-heading">

          <p className="form-label">
            APPLICATIONS
          </p>

          <h2>
            Recent Applications
          </h2>

        </div>


        {loading ? (

          <div className="dashboard-message">
            Loading applications...
          </div>

        ) : applications.length === 0 ? (

          <div className="dashboard-message">

            <h3>
              No Applications Yet
            </h3>

            <p>
              Start exploring jobs and submit
              your first application.
            </p>

            <Link
              to="/jobs"
              className="dashboard-btn"
            >
              Explore Jobs
            </Link>

          </div>

        ) : (

          <div className="recent-applications">

            {applications
              .slice(0, 3)
              .map((application) => (

                <div
                  className="recent-application-card"
                  key={application.id}
                >

                  <div>

                    <h3>
                      {application.fullName}
                    </h3>

                    <p>
                      {application.qualification}
                    </p>

                    <p>
                      Applied on{" "}
                      {application.appliedDate
                        ? new Date(
                            application.appliedDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "Not Available"}
                    </p>

                  </div>

                  <span className="application-status">
                    {application.status ||
                      "Applied"}
                  </span>

                </div>

              ))}

            <Link
              to="/my-applications"
              className="dashboard-view-all"
            >
              View All Applications →
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}

export default CandidateDashboard;