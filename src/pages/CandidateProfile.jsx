
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  FileText,
  BriefcaseBusiness,
  UserRound,
  Code2,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import api from "../services/api";

function CandidateProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          navigate("/login", { replace: true });
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        if (!active) return;
        setUser(loggedInUser);

        const response = await api.get("/applications");

        if (!active) return;

        const userEmail = loggedInUser.email
          ?.trim()
          .toLowerCase();

        const userApplications = response.data.filter((application) => {
          const applicationEmail = application.email
            ?.trim()
            .toLowerCase();

          const emailMatches =
            userEmail && applicationEmail === userEmail;

          const idMatches =
            application.userId != null &&
            loggedInUser.id != null &&
            String(application.userId) === String(loggedInUser.id);

          return emailMatches || idMatches;
        });

        const latestApplication = userApplications.length
          ? userApplications[userApplications.length - 1]
          : null;

        setProfile({
          name:
            latestApplication?.name ||
            latestApplication?.candidateName ||
            loggedInUser.name ||
            "Not provided",

          email: loggedInUser.email || "Not provided",

          phone:
            latestApplication?.phone ||
            latestApplication?.phoneNumber ||
            "Not provided",

          education:
            latestApplication?.education ||
            latestApplication?.qualification ||
            "Not provided",

          location:
            latestApplication?.location ||
            latestApplication?.address ||
            "Not provided",

          skills: latestApplication?.skills || "",

          linkedin:
            latestApplication?.linkedin ||
            latestApplication?.linkedinUrl ||
            "",

          github:
            latestApplication?.github ||
            latestApplication?.githubUrl ||
            "",

          resume:
            latestApplication?.resumeName ||
            latestApplication?.resumeFileName ||
            latestApplication?.resume ||
            "",

          applicationsCount: userApplications.length,
        });
      } catch (err) {
        console.error("Unable to load candidate profile:", err);

        if (active) {
          setError(
            "Unable to load your profile. Please check whether JSON Server is running."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [navigate]);

  function getSafeProfileUrl(value, platform) {
    if (!value || typeof value !== "string") {
      return null;
    }

    try {
      const url = new URL(
        /^https?:\/\//i.test(value)
          ? value
          : `https://${value}`
      );

      const hostname = url.hostname.toLowerCase();

      const allowedHosts =
        platform === "linkedin"
          ? ["linkedin.com", "www.linkedin.com"]
          : ["github.com", "www.github.com"];

      if (
        !["https:", "http:"].includes(url.protocol) ||
        !allowedHosts.includes(hostname)
      ) {
        return null;
      }

      return url.href;
    } catch {
      return null;
    }
  }

  if (loading) {
    return (
      <main className="candidate-profile-page">
        <div className="profile-loading">
          <LoaderCircle
            className="profile-spinner"
            size={32}
          />
          <p>Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="candidate-profile-page">
        <section className="profile-message-card">
          <h2>Unable to Load Profile</h2>
          <p>{error}</p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>

          <button
            type="button"
            className="profile-back-btn"
            onClick={() => navigate("/candidate-dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </section>
      </main>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const linkedinUrl = getSafeProfileUrl(
    profile.linkedin,
    "linkedin"
  );

  const githubUrl = getSafeProfileUrl(
    profile.github,
    "github"
  );

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="candidate-profile-page">
      <div className="candidate-profile-wrapper">
        <button
          type="button"
          className="profile-back-btn"
          onClick={() => navigate("/candidate-dashboard")}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <section className="candidate-profile-header">
          <div className="profile-avatar">
            {initials || <UserRound size={35} />}
          </div>

          <div className="profile-header-info">
            <span className="profile-eyebrow">
              CANDIDATE PROFILE
            </span>

            <h1>{profile.name}</h1>

            <p>
              <Mail size={16} />
              {profile.email}
            </p>
          </div>

          <div className="profile-role-badge">
            <UserRound size={15} />
            Candidate
          </div>
        </section>

        <div className="candidate-profile-grid">
          <section className="profile-content-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <UserRound size={20} />
              </div>

              <div>
                <h2>Personal Information</h2>
                <p>Your basic contact details</p>
              </div>
            </div>

            <div className="profile-detail-grid">
              <div className="profile-detail-item">
                <span>
                  <UserRound size={16} />
                  Full Name
                </span>
                <strong>{profile.name}</strong>
              </div>

              <div className="profile-detail-item">
                <span>
                  <Mail size={16} />
                  Email Address
                </span>
                <strong>{profile.email}</strong>
              </div>

              <div className="profile-detail-item">
                <span>
                  <Phone size={16} />
                  Phone Number
                </span>
                <strong>{profile.phone}</strong>
              </div>

              <div className="profile-detail-item">
                <span>
                  <MapPin size={16} />
                  Location
                </span>
                <strong>{profile.location}</strong>
              </div>

              <div className="profile-detail-item">
                <span>
                  <GraduationCap size={16} />
                  Education
                </span>
                <strong>{profile.education}</strong>
              </div>

              {profile.skills && (
                <div className="profile-detail-item">
                  <span>
                    <Code2 size={16} />
                    Skills
                  </span>
                  <strong>{profile.skills}</strong>
                </div>
              )}
            </div>
          </section>

          <section className="profile-content-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h2>Application Overview</h2>
                <p>Your recruitment activity</p>
              </div>
            </div>

            <div className="profile-stat">
              <span className="profile-stat-number">
                {profile.applicationsCount}
              </span>

              <span className="profile-stat-label">
                Submitted Applications
              </span>
            </div>

            <p className="profile-helper-text">
              View the applications submitted through your account.
            </p>

            <button
              type="button"
              className="profile-primary-btn"
              onClick={() => navigate("/my-applications")}
            >
              View My Applications
              <ExternalLink size={16} />
            </button>
          </section>

          <section className="profile-content-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <Code2 size={20} />
              </div>

              <div>
                <h2>Professional Profiles</h2>
                <p>Your professional links</p>
              </div>
            </div>

            <div className="profile-link-list">
              <div className="profile-link-item">
                <ExternalLink size={22} />

                <div className="profile-link-info">
                  <strong>LinkedIn</strong>

                  {linkedinUrl ? (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View LinkedIn Profile
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span>
                      Not provided in your latest application
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-link-item">
                <Code2 size={22} />

                <div className="profile-link-info">
                  <strong>GitHub</strong>

                  {githubUrl ? (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Profile
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span>
                      Not provided in your latest application
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="profile-content-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <FileText size={20} />
              </div>

              <div>
                <h2>Resume</h2>
                <p>Your submitted resume details</p>
              </div>
            </div>

            {profile.resume ? (
              <div className="profile-resume-box">
                <div className="profile-resume-icon">
                  <FileText size={25} />
                </div>

                <div className="profile-resume-info">
                  <strong>
                    {typeof profile.resume === "string"
                      ? profile.resume.split(/[\\/]/).pop()
                      : "Resume"}
                  </strong>

                  <span>Resume reference from your application</span>
                </div>
              </div>
            ) : (
              <div className="profile-empty-state">
                <FileText size={28} />
                <p>
                  No resume details found in your latest application.
                </p>
              </div>
            )}

            <p className="profile-helper-text">
              This displays the resume information saved with your
              application. It does not download the original file.
            </p>
          </section>
        </div>

        <section className="profile-jobs-banner">
          <div>
            <h2>Ready for your next opportunity?</h2>
            <p>
              Explore available jobs and find your next career move.
            </p>
          </div>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={() => navigate("/jobs")}
          >
            <BriefcaseBusiness size={17} />
            Browse Jobs
          </button>
        </section>
      </div>
    </main>
  );
}

export default CandidateProfile;
