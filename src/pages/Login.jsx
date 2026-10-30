
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function getUsers() {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("cinebookUsers") || "[]"
      );

      return Array.isArray(savedUsers) ? savedUsers : [];
    } catch {
      return [];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    // REGISTRATION

    if (isRegister) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const existingUser = users.find(
        (user) => user.email === normalizedEmail
      );

      if (existingUser) {
        setError("This email is already registered.");
        return;
      }

      const newUser = {
        name: name.trim(),
        email: normalizedEmail,
        password: password
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem(
        "cinebookUsers",
        JSON.stringify(updatedUsers)
      );

      const loggedInUser = {
        name: newUser.name,
        email: newUser.email
      };

      localStorage.setItem(
        "cinebookUser",
        JSON.stringify(loggedInUser)
      );

      if (onLogin) {
        onLogin(loggedInUser);
      }

      alert("Registration successful!");

      navigate("/");
    }

    // LOGIN

    else {
      const existingUser = users.find(
        (user) =>
          user.email === normalizedEmail &&
          user.password === password
      );

      if (!existingUser) {
        setError("Invalid email or password.");
        return;
      }

      const loggedInUser = {
        name: existingUser.name,
        email: existingUser.email
      };

      localStorage.setItem(
        "cinebookUser",
        JSON.stringify(loggedInUser)
      );

      if (onLogin) {
        onLogin(loggedInUser);
      }

      alert("Login successful!");

      navigate("/");
    }
  }

  function toggleForm() {
    setIsRegister(!isRegister);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setError("");
    setSuccess("");
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

        <h1>
          {isRegister
            ? "Create Your Account"
            : "Welcome Back!"}
        </h1>

        <p className="login-description">
          {isRegister
            ? "Join CineBook and book your favourite movies."
            : "Login to continue your movie experience."}
        </p>

        {/* REGISTRATION NAME */}

        {isRegister && (
          <>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}

        {/* EMAIL */}

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {/* CONFIRM PASSWORD */}

        {isRegister && (
          <>
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              minLength={6}
              required
            />
          </>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {success && (
          <p className="login-success">
            {success}
          </p>
        )}

        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          className="book-btn"
        >
          {isRegister ? "Create Account" : "Login"}
        </button>

        {/* SWITCH LOGIN / REGISTER */}

        <div className="switch-account">

          <span>
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>

          <button
            type="button"
            onClick={toggleForm}
          >
            {isRegister ? "Login" : "Register"}
          </button>

        </div>

        {/* HOME LINK */}

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

      </form>

    </section>
  );
}

export default Login;
