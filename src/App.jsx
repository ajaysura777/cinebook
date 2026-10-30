
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import TheatreSelection from "./pages/TheatreSelection";
import SeatBooking from "./pages/SeatBooking";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Hyderabad");

  const [user, setUser] = useState(() => {
    return JSON.parse(
      localStorage.getItem("cinebookUser") || "null"
    );
  });

  const [admin, setAdmin] = useState(() => {
    return JSON.parse(
      localStorage.getItem("cinebookAdmin") || "null"
    );
  });

  function handleLogout() {
    localStorage.removeItem("cinebookUser");
    setUser(null);
    alert("Successfully logged out!");
  }
  function handleAdminLogout() {
  localStorage.removeItem("cinebookAdmin");
  setAdmin(null);
  alert("Admin logged out successfully!");
}

  return (
    <BrowserRouter>
      <Navbar
        search={search}
        setSearch={setSearch}
        city={city}
        setCity={setCity}
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<Home search={search} />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/login"
          element={<Login onLogin={setUser} />}
        />

        <Route
          path="/theatres/:id"
          element={<TheatreSelection />}
        />

        <Route
          path="/seats"
          element={<SeatBooking />}
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin onAdminLogin={setAdmin} />}
        />

        <Route
          path="/admin"
          element={
            admin ? (
              <AdminDashboard onAdminLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<h2 className="not-found">404 - Page Not Found</h2>}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
