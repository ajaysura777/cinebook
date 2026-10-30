
import { useState } from "react";
import { getMovies } from "../data/movieStorage";
import MovieCard from "../components/MovieCard";

function Home({ search }) {
  const [category, setCategory] = useState("All");

  const movies = getMovies();

  const categories = [
    "All",
    "Action",
    "Drama",
    "Sci-Fi",
    "Fantasy"
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory =
      category === "All" ||
      movie.genre.toLowerCase().includes(category.toLowerCase());

    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            YOUR ENTERTAINMENT DESTINATION
          </span>

          <h1>
            Movies are better
            <br />
            on the <span>BIG SCREEN.</span>
          </h1>

          <p>
            Discover movies, explore theatres and book your
            favourite seats with CineBook.
          </p>

          <a href="#movies" className="hero-btn">
            Explore Movies →
          </a>

        </div>

      </section>

      <section className="movies-section" id="movies">

        <div className="section-heading">

          <div>
            <span className="section-tag">
              NOW SHOWING
            </span>

            <h2>Recommended Movies</h2>
          </div>

          <span className="movie-count">
            {filteredMovies.length} Movies
          </span>

        </div>

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category active"
                  : "category"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <div className="movie-grid">

          {filteredMovies.length > 0 ? (

            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))

          ) : (

            <p>No movies found. Try another search.</p>

          )}

        </div>

      </section>

      <section className="offer-banner">

        <div>
          <span>EXCLUSIVE CINEMA EXPERIENCE</span>

          <h2>Your next movie night starts here!</h2>

          <p>
            Discover exciting movies and book your seats.
          </p>
        </div>

        <div className="offer-icon">
          🎬
        </div>

      </section>

    </main>
  );
}

export default Home;
