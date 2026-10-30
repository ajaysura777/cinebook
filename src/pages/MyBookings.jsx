
import { Link } from "react-router-dom";

function MyBookings() {
  const bookings = JSON.parse(
    localStorage.getItem("cinebookBookings") || "[]"
  );

  return (
    <section className="my-bookings">

      <h1>My Bookings</h1>
      <p>Your movie ticket booking history</p>

      {bookings.length === 0 ? (
        <div className="empty-bookings">

          <h2>No bookings yet!</h2>

          <p>
            Book your favourite movie and enjoy the show.
          </p>

          <Link to="/" className="book-btn">
            Explore Movies
          </Link>

        </div>
      ) : (

        bookings.map((booking) => (

          <div
            className="booking-history-card"
            key={booking.bookingId}
          >

            <div className="history-header">

              <h2>{booking.movie.title}</h2>

              <span>{booking.bookingId}</span>

            </div>

            <p>
              <strong>Theatre:</strong>{" "}
              {booking.theatre.name}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {booking.theatre.location}
            </p>

            <p>
              <strong>Showtime:</strong>{" "}
              {booking.time}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {booking.selectedSeats.join(", ")}
            </p>

            <p>
              <strong>Tickets:</strong>{" "}
              {booking.selectedSeats.length}
            </p>

            <p>
              <strong>Booking Date:</strong>{" "}
              {booking.bookingDate}
            </p>

            <h3>Total Amount: ₹{booking.total}</h3>

          </div>

        ))

      )}

    </section>
  );
}

export default MyBookings;
