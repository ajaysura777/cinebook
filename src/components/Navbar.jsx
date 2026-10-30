
import { Link } from "react-router-dom";

function Navbar({
  search,
  setSearch,
  city,
  setCity,
  user,
  onLogout
}) {
  return (
    <nav className="navbar">

      <div className="nav-container">

        <Link to="/" className="logo">
          Cine<span>Book</span>
        </Link>

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search for movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-actions">
            <Link to="/admin" className="admin-btn">
            Admin Dashboard
            </Link>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-select"
          >
            <option>Hyderabad</option>
            <option>Bengaluru</option>
            <option>Chennai</option>
            <option>Mumbai</option>
            <option>Delhi</option>
          </select>

          <Link to="/my-bookings" className="login-btn">
            My Bookings
          </Link>

          {user ? (
            <>
              <span className="user-greeting">
                Hi, {user.name}!
              </span>

              <button
                className="logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin-login" className="admin-btn">
  Admin Login
</Link>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
