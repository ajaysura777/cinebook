
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin({ onAdminLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Demo admin credentials
    const adminEmail = "admin@cinebook.com";
    const adminPassword = "admin123";

    if (
      email.trim().toLowerCase() === adminEmail &&
      password === adminPassword
    ) {
      const admin = {
        name: "Administrator",
        email: adminEmail
      };

      localStorage.setItem(
        "cinebookAdmin",
        JSON.stringify(admin)
      );

      onAdminLogin(admin);

      alert("Admin login successful!");

      navigate("/admin");
    } else {
      setError("Invalid administrator email or password.");
    }
  }

  return (
    <section className="login-page">

      <form
        className="login-card"
        onSubmit={handleSubmit}
      >

        <div className="login-logo">
          Cine<span>Book</span>
        </div>

        <h1>Admin Login</h1>

        <p className="login-description">
          Sign in to manage your CineBook movie catalogue.
        </p>

        <label>Admin Email</label>

        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="book-btn"
        >
          Admin Login
        </button>

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

      </form>

    </section>
  );
}

export default AdminLogin;
