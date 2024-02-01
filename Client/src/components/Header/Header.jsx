import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="nav-container">
      <p>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          PrimeHaven
        </Link>
      </p>

      <nav className="navbar">
        <ul>
          <li>
            <Link
              to="/explore/properties"
              style={{ textDecoration: "none", color: "white" }}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
