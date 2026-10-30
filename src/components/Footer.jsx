
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>Cine<span>Book</span></h2>
          <p>Your favourite movies, one click away.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/login">Sign In</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@cinebook.example</p>
          <p>Location: Hyderabad, India</p>
        </div>
      </div>

      <div className="copyright">
        © 2026 CineBook. Developed By S.AJAY KUMAR.
      </div>
    </footer>
  );
}

export default Footer;
