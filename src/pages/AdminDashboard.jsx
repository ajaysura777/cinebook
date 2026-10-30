
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getMovies,
  saveMovies
} from "../data/movieStorage";

function AdminDashboard({ onAdminLogout }) {
  const [movies, setMovies] = useState(() => getMovies());

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: "",
    language: "Telugu",
    duration: "",
    poster: "",
    description: ""
  });

  // HANDLE INPUT CHANGES

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // RESET FORM

  function resetForm() {
    setForm({
      title: "",
      genre: "",
      rating: "",
      language: "Telugu",
      duration: "",
      poster: "",
      description: ""
    });

    setEditingId(null);
  }

  // ADD OR UPDATE MOVIE

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const movieData = {
      ...form,
      title: form.title.trim(),
      rating: Number(form.rating)
    };

    let updatedMovies;

    if (editingId !== null) {
      updatedMovies = movies.map((movie) =>
        movie.id === editingId
          ? { ...movie, ...movieData }
          : movie
      );
    } else {
      const newMovie = {
        ...movieData,
        id: Date.now()
      };

      updatedMovies = [...movies, newMovie];
    }

    const saved = saveMovies(updatedMovies);

    if (saved) {
      setMovies(updatedMovies);

      setMessage(
        editingId !== null
          ? "Movie updated successfully!"
          : "Movie added successfully!"
      );

      resetForm();
    } else {
      setMessage(
        "Unable to save movie. Check browser storage."
      );
    }
  }

  // EDIT MOVIE

  function handleEdit(movie) {
    setForm({
      title: movie.title || "",
      genre: movie.genre || "",
      rating: String(movie.rating || ""),
      language: movie.language || "Telugu",
      duration: movie.duration || "",
      poster: movie.poster || "",
      description: movie.description || ""
    });

    setEditingId(movie.id);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // DELETE MOVIE

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    const updatedMovies = movies.filter(
      (movie) => movie.id !== id
    );

    const saved = saveMovies(updatedMovies);

    if (saved) {
      setMovies(updatedMovies);

      setMessage("Movie deleted successfully!");

      if (editingId === id) {
        resetForm();
      }
    } else {
      setMessage("Unable to delete movie.");
    }
  }

  // ADMIN DASHBOARD UI

  return (
    <section className="admin-dashboard">

      {/* ADMIN HEADER */}

      <div className="admin-header">

        <div>
          <span className="section-tag">
            CINEBOOK MANAGEMENT
          </span>

          <h1>Admin Dashboard</h1>

          <p>Manage your CineBook movie catalogue.</p>
        </div>

        <div className="admin-header-actions">

          <Link to="/" className="admin-home-btn">
            View Website
          </Link>

          <button
            className="logout-btn"
            onClick={() => onAdminLogout?.()}
          >
            Admin Logout
          </button>

        </div>

      </div>

      {/* DASHBOARD STATISTICS */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>Total Movies</span>
          <h2>{movies.length}</h2>
        </div>

        <div className="admin-stat-card">
          <span>Languages</span>
          <h2>
            {
              new Set(
                movies.map((movie) => movie.language)
              ).size
            }
          </h2>
        </div>

        <div className="admin-stat-card">
          <span>Catalogue Status</span>
          <h2>Active</h2>
        </div>

      </div>

      {/* ADD / EDIT MOVIE FORM */}

      <div className="admin-form-card">

        <h2>
          {editingId !== null
            ? "Edit Movie"
            : "Add New Movie"}
        </h2>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="admin-form-grid">

            {/* MOVIE TITLE */}

            <div>
              <label>Movie Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter movie title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* GENRE */}

            <div>
              <label>Genre</label>

              <input
                type="text"
                name="genre"
                placeholder="Action / Drama"
                value={form.genre}
                onChange={handleChange}
                required
              />
            </div>

            {/* RATING */}

            <div>
              <label>Rating (0–10)</label>

              <input
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                placeholder="Example: 8.5"
                value={form.rating}
                onChange={handleChange}
                required
              />
            </div>

            {/* LANGUAGE */}

            <div>
              <label>Language</label>

              <select
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option>Telugu</option>
                <option>Hindi</option>
                <option>English</option>
                <option>Tamil</option>
                <option>Kannada</option>
                <option>Malayalam</option>
              </select>
            </div>

            {/* DURATION */}

            <div>
              <label>Duration</label>

              <input
                type="text"
                name="duration"
                placeholder="Example: 2h 30m"
                value={form.duration}
                onChange={handleChange}
                required
              />
            </div>

            {/* POSTER URL */}

            <div>
              <label>Poster Image URL</label>

              <input
                type="url"
                name="poster"
                placeholder="https://example.com/poster.jpg"
                value={form.poster}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* POSTER PREVIEW */}

          {form.poster && (
            <div className="poster-preview">

              <label>Movie Poster Preview</label>

              <img
                src={form.poster}
                alt="Movie poster preview"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                }}
              />

            </div>
          )}

          {/* DESCRIPTION */}

          <div className="admin-description">

            <label>Movie Description</label>

            <textarea
              name="description"
              placeholder="Enter movie description"
              value={form.description}
              onChange={handleChange}
              required
            />

          </div>

          {/* FORM BUTTONS */}

          <div className="admin-form-actions">

            <button
              type="submit"
              className="book-btn"
            >
              {editingId !== null
                ? "Update Movie"
                : "Add Movie"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* MOVIE MANAGEMENT */}

      <div className="admin-movies-section">

        <h2>Manage Movies</h2>

        {movies.length === 0 ? (

          <p>No movies available. Add your first movie.</p>

        ) : (

          <div className="admin-movie-list">

            {movies.map((movie) => (

              <div
                className="admin-movie-card"
                key={movie.id}
              >

                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/150x220/211d27/ffffff?text=No+Image";
                  }}
                />

                <div className="admin-movie-info">

                  <h3>{movie.title}</h3>

                  <p>{movie.genre}</p>

                  <p>
                    {movie.language} | {movie.duration}
                  </p>

                  <p>⭐ {movie.rating}/10</p>

                  <div className="admin-actions">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminDashboard;
