import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJob();
  }, [id]);

  async function getJob() {
    try {
      const response = await api.get(`/jobs/${id}`);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  }

  function handleApply() {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      toast.error("Please login to apply for this job.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    navigate(`/apply/${job.id}`);
  }

  if (loading) {
    return (
      <main className="loading">
        <h2>Loading Job Details...</h2>
        <p>Please wait while we fetch the job information.</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="no-jobs">
        <h2>Job Not Found</h2>
        <p>The job you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="job-details-page">

      <div className="job-details-container">

        {/* Job Image */}
        <div className="job-details-image">

          <img
            src={job.image}
            alt={job.title}
          />

        </div>


        {/* Job Information */}
        <div className="job-details-content">

          <p className="job-category">
            {job.category}
          </p>

          <h1>
            {job.title}
          </h1>

          <h3 className="details-company">
            {job.company}
          </h3>


          <div className="job-info">

            <p>
              📍 <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <p>
              💼 <strong>Job Type:</strong>{" "}
              {job.type}
            </p>

            <p>
              🎓 <strong>Experience:</strong>{" "}
              {job.experience}
            </p>

            <p>
              💰 <strong>Salary:</strong>{" "}
              {job.salary}
            </p>

            <p>
              ⭐ <strong>Rating:</strong>{" "}
              {job.rating}
            </p>

          </div>


          {/* Description */}
          <div className="job-section">

            <h2>
              Job Description
            </h2>

            <p>
              {job.description}
            </p>

          </div>


          {/* Requirements */}
          <div className="job-section">

            <h2>
              Requirements
            </h2>

            <ul>
              {job.requirements?.map(
                (requirement, index) => (
                  <li key={index}>
                    {requirement}
                  </li>
                )
              )}
            </ul>

          </div>


          {/* Apply Button */}
          <div className="apply-section">

            <button
              className="apply-btn"
              onClick={handleApply}
            >
              Apply Now
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default JobDetails;