import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import defaultPic from "../../assets/images/DefaultProfile.png";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  (async () => {
    try {
      const res = await axios.get("/api/logged-in");
      const { isLoggedIn, username } = res.data;
      setIsAuthenticated(isLoggedIn);
      setUserName(username);
    } catch (err) {
      console.log("Error during fetching: ", err);
    }
  })();

  return isAuthenticated ? (
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
              to="/logout"
              style={{ textDecoration: "none", color: "white" }}
            >
              Logout
            </Link>
          </li>
          <li>
            <Link
              to="/explore/properties"
              style={{ textDecoration: "none", color: "white" }}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link to="/profile" className="profile-desc">
              {userName}
              <img src={defaultPic} alt="default-profile" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  ) : (
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
