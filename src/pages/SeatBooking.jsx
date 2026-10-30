
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function SeatBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!booking) {
    return (
      <div className="not-found">
        <h2>No booking information found!</h2>
        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const categories = [
    { name: "Silver", price: 150, rows: ["A", "B"] },
    { name: "Gold", price: 200, rows: ["C", "D"] },
    { name: "Premium", price: 300, rows: ["E", "F"] }
  ];

  const occupiedSeats = ["A3", "B5", "C2", "D7", "E4"];

  function toggleSeat(seat) {
    if (occupiedSeats.includes(seat)) return;

    setSelectedSeats((previous) =>
      previous.includes(seat)
        ? previous.filter((item) => item !== seat)
        : [...previous, seat]
    );
  }

  function getPrice(seat) {
    const row = seat.charAt(0);

    if (["A", "B"].includes(row)) return 150;
    if (["C", "D"].includes(row)) return 200;
    return 300;
  }

  const total = selectedSeats.reduce(
    (sum, seat) => sum + getPrice(seat),
    0
  );

  return (
    <section className="seat-page">

      <h1>Select Your Seats</h1>

      <div className="seat-heading">
        <h2>{booking.movie.title}</h2>
        <p>{booking.theatre.name}</p>
        <p>{booking.time}</p>
      </div>

      <div className="screen">
        SCREEN THIS WAY
      </div>

      {categories.map((category) => (
        <div className="seat-category" key={category.name}>
          <h3>
            {category.name} - ₹{category.price}
          </h3>

          {category.rows.map((row) => (
            <div className="seat-row" key={row}>
              <span>{row}</span>

              {Array.from({ length: 8 }, (_, index) => {
                const seat = `${row}${index + 1}`;

                return (
                  <button
                    key={seat}
                    disabled={occupiedSeats.includes(seat)}
                    onClick={() => toggleSeat(seat)}
                    className={`seat ${
                      occupiedSeats.includes(seat)
                        ? "occupied"
                        : selectedSeats.includes(seat)
                        ? "selected-seat"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      <div className="seat-legend">
        <span>🟩 Available</span>
        <span>🟥 Selected</span>
        <span>⬜ Occupied</span>
      </div>

      <div className="booking-summary">
        <h2>Booking Summary</h2>

        <p>Seats: {selectedSeats.join(", ") || "None"}</p>

        <p>Tickets: {selectedSeats.length}</p>

        <h3>Total: ₹{total}</h3>

        
<button
  className="book-btn"
  disabled={selectedSeats.length === 0}
  onClick={() => {
    const newBooking = {
      ...booking,
      selectedSeats,
      total,
      bookingId: "CB" + Date.now(),
      bookingDate: new Date().toLocaleDateString()
    };

    const previousBookings = JSON.parse(
      localStorage.getItem("cinebookBookings") || "[]"
    );

    localStorage.setItem(
      "cinebookBookings",
      JSON.stringify([...previousBookings, newBooking])
    );

    navigate("/confirmation", {
      state: newBooking
    });
  }}
>
  Continue
</button>

      </div>

    </section>
  );
}

export default SeatBooking;
