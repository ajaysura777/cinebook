
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="not-found">
        <h2>No booking details available!</h2>
        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <section className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">✓</div>

        <h1>Booking Confirmed!</h1>

        <p className="success-message">
          Your demo movie booking details are ready.
        </p>

        <div className="ticket-details">

          <h2>{booking.movie.title}</h2>

          <p>
            <strong>Theatre:</strong> {booking.theatre.name}
          </p>

          <p>
            <strong>Location:</strong> {booking.theatre.location}
          </p>

          <p>
            <strong>Showtime:</strong> {booking.time}
          </p>

          <p>
            <strong>Language:</strong> {booking.movie.language}
          </p>

          <p>
            <strong>Seats:</strong> {booking.selectedSeats.join(", ")}
          </p>

          <p>
            <strong>Total Tickets:</strong> {booking.selectedSeats.length}
          </p>

          <h3>Total Amount: ₹{booking.total}</h3>

        </div>

        <button
          className="book-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>

    </section>
  );
}

export default Confirmation;
