
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMovies } from "../data/movieStorage";

function TheatreSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = getMovies();

  const movie = movies.find((m) => m.id === Number(id));

  const [selectedTime, setSelectedTime] = useState("");

  const theatres = [
    {
      id: 1,
      name: "PVR Cinemas",
      location: "Inorbit Mall, Hyderabad",
      price: 250,
      times: ["10:00 AM", "1:30 PM", "6:30 PM", "9:30 PM"]
    },
    {
      id: 2,
      name: "AMB Cinemas",
      location: "Gachibowli, Hyderabad",
      price: 300,
      times: ["11:00 AM", "2:00 PM", "6:00 PM", "9:00 PM"]
    },
    {
      id: 3,
      name: "INOX Cinemas",
      location: "Kukatpally, Hyderabad",
      price: 200,
      times: ["10:30 AM", "1:00 PM", "5:30 PM", "8:30 PM"]
    }
  ];

  if (!movie) {
    return <h2 className="not-found">Movie not found!</h2>;
  }

  function handleBooking(theatre, time) {
    navigate("/seats", {
      state: {
        movie,
        theatre,
        time
      }
    });
  }

  return (
    <section className="theatre-page">
      <div className="theatre-heading">
        <span className="section-tag">BOOK YOUR TICKETS</span>
        <h1>{movie.title}</h1>
        <p>{movie.language} | {movie.genre} | {movie.duration}</p>
      </div>

      <h2>Available Theatres</h2>

      {theatres.map((theatre) => (
        <div className="theatre-card" key={theatre.id}>
          <div className="theatre-info">
            <h3>{theatre.name}</h3>
            <p>📍 {theatre.location}</p>
            <p>Ticket price: ₹{theatre.price}</p>
          </div>

          <div className="showtimes">
            {theatre.times.map((time) => (
              <button
                key={time}
                className={
                  selectedTime === `${theatre.id}-${time}`
                    ? "showtime selected"
                    : "showtime"
                }
                onClick={() =>
                  setSelectedTime(`${theatre.id}-${time}`)
                }
              >
                {time}
              </button>
            ))}
          </div>

          <button
            className="book-btn theatre-book"
            disabled={!theatre.times.some(
              (time) => selectedTime === `${theatre.id}-${time}`
            )}
            onClick={() => {
              const time = selectedTime.split("-").slice(1).join("-");
              handleBooking(theatre, time);
            }}
          >
            Select Seats
          </button>
        </div>
      ))}

      <Link to={`/movie/${movie.id}`} className="back-link">
        ← Back to Movie
      </Link>
    </section>
  );
}

export default TheatreSelection;
