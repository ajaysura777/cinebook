import { useParams, Link, useNavigate } from "react-router-dom";
import { getMovies } from "../data/movieStorage";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = getMovies();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <h2 className="not-found">Movie not found!</h2>;
  }

  return (
    <section className="details-page">
      <div className="details-card">
        <img src={movie.poster} alt={movie.title} />

        <div className="details-content">
          <span className="section-tag">MOVIE DETAILS</span>
          <h1>{movie.title}</h1>

          <div className="details-rating">
            ⭐ {movie.rating}/10
          </div>

          <p>{movie.description}</p>

          <div className="details-meta">
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
          </div>

          <button
          className="book-btn details-book"
          onClick={() => navigate(`/theatres/${movie.id}`)}
         >
         Book Tickets
         </button>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
