
import { movies as defaultMovies } from "./movies";

const STORAGE_KEY = "cinebookMovies";

export function getMovies() {
  try {
    const savedMovies = localStorage.getItem(STORAGE_KEY);

    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);

      if (Array.isArray(parsedMovies)) {
        return parsedMovies;
      }
    }

    return defaultMovies;
  } catch (error) {
    console.error("Unable to load movies:", error);
    return defaultMovies;
  }
}

export function saveMovies(movieList) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(movieList)
    );

    return true;
  } catch (error) {
    console.error("Unable to save movies:", error);
    return false;
  }
}
