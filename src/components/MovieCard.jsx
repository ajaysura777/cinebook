
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const fallbackImage =
    `https://placehold.co/500x750/211d27/ffffff?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="movie-card">

      <Link to={`/movie/${movie.id}`}>
        <div className="poster-wrapper">

          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />

          <div className="rating">
            ⭐ {movie.rating}/10
          </div>

        </div>
      </Link>

      <div className="movie-info">

        <h3>{movie.title}</h3>

        <p>{movie.genre}</p>

        <div className="movie-meta">
          <span>{movie.language}</span>
          <span>{movie.duration}</span>
        </div>

        <Link
          to={`/movie/${movie.id}`}
          className="book-btn"
        >
          Book Tickets
        </Link>

      </div>

    </div>
  );
}

export default MovieCard;
