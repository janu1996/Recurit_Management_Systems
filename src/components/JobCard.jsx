import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";
import toast from "react-hot-toast";

function JobCard({ job, onDelete }) {
  const dispatch = useDispatch();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isRecruiter =
    user?.role?.toLowerCase() === "recruiter";

  function handleFavorite() {
    dispatch(addFavorite(job));
    toast.success("Job added to favorites!");
  }

  return (
    <div className="job-card">
      <img
        src={job.image}
        alt={job.title}
      />

      <div className="job-card-content">
        <p className="job-category">
          {job.category}
        </p>

        <h3>{job.title}</h3>

        <p className="company">
          {job.company}
        </p>

        <p>📍 {job.location}</p>
        <p>💼 {job.type}</p>
        <p>💰 {job.salary}</p>
        <p>⭐ {job.rating}</p>

        <div className="card-actions">
          <Link
            to={`/jobs/${job.id}`}
            className="view-btn"
          >
            View
          </Link>

          {isRecruiter && (
            <>
              <Link
                to={`/edit-job/${job.id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => onDelete?.(job.id)}
              >
                Delete
              </button>
            </>
          )}

          <button
            className="favorite-btn"
            onClick={handleFavorite}
          >
            ❤️ Favorite
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;