import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites
  );

  return (
    <main className="favorites-container">

      <h1 className="page-title">
        Favorite Jobs
      </h1>

      {favorites.length === 0 ? (

        <div className="empty-favorites">

          <h2>
            No Favorite Jobs
          </h2>

          <p>
            Add jobs from the Jobs page to see
            them here.
          </p>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((job) => (

            <div
              key={job.id}
              className="favorite-card"
            >

              <img
                src={job.image}
                alt={job.title}
              />

              <div className="favorite-content">

                <p className="job-category">
                  {job.category}
                </p>

                <h2>
                  {job.title}
                </h2>

                <p>
                  🏢 {job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💼 {job.type}
                </p>

                <p>
                  💰 {job.salary}
                </p>

                <button
                  className="remove-favorite-btn"
                  onClick={() =>
                    dispatch(
                      removeFavorite(job.id)
                    )
                  }
                >
                  Remove from Favorites
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Favorites;