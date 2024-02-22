import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

import defaultPic from "../../assets/images/DefaultProfile.png";
import darkThemeIcon from "../../assets/images/DarkThemeIcon.png";
import lightThemeIcon from "../../assets/images/LightThemeIcon.png";
import downArrowWhite from "../../assets/images/DownArrowWhite.png";
import downArrowBlack from "../../assets/images/DownArrowBlack.png";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    const themeImage = document.querySelector(".theme-image");
    const dropDownArrow = document.querySelector(".drop-down-arrow");
    const body = document.querySelector("body");

    if (isDarkMode) {
      themeImage.src = darkThemeIcon;
      if (dropDownArrow) {
        dropDownArrow.src = downArrowBlack;
      }
      themeImage.setAttribute("alt", "Dark Theme Icon");
      setIsDarkMode(false);
    } else {
      themeImage.src = lightThemeIcon;
      if (dropDownArrow) {
        dropDownArrow.src = downArrowWhite;
      }
      themeImage.setAttribute("alt", "Light Theme Icon");
      setIsDarkMode(true);
    }

    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");
  };

  const handleDropDown = () => {
    const dropDownArrow = document.querySelector(".drop-down-arrow");
    const dropDownList = document.querySelector(".user-info");
    dropDownArrow.classList.toggle("rotate");
    dropDownList.classList.toggle("hidden");
  };

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
        <Link to="/" className="link">
          PrimeHaven
        </Link>
      </p>

      <nav className="navbar">
        <ul>
          <li>
            <img
              src={lightThemeIcon}
              alt="Light Theme Icon"
              className="theme-image"
              onClick={handleClick}
            />
          </li>
          <li>
            <p className="properties">Properties</p>
            <div className="props-dropdown">
              <Link to="/buy-property" className="link">
                Buy
              </Link>
              <Link to="/sell-property" className="link">
                Sell
              </Link>
            </div>
          </li>
          <li>
            <div className="user">
              <img src={defaultPic} alt="default-profile" />
              <img
                src={downArrowWhite}
                alt="drop-down-arrow"
                className="drop-down-arrow"
                onClick={handleDropDown}
              />
            </div>
            <div className="user-info hidden">
              {userName}
              <hr />
              <Link to="/profile" className="link">
                Profile
              </Link>
              <Link to="/logout" className="link">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  ) : (
    <header className="nav-container">
      <p>
        <Link to="/" className="link">
          PrimeHaven
        </Link>
      </p>

      <nav className="navbar">
        <ul>
          <li>
            <img
              src={lightThemeIcon}
              alt="Light Theme Icon"
              className="theme-image"
              onClick={handleClick}
            />
          </li>
          <li>
            <p className="properties">Properties</p>
            <div className="props-dropdown">
              <Link to="/buy-property" className="link">
                Buy
              </Link>
              <Link to="/sell-property" className="link">
                Sell
              </Link>
            </div>
          </li>
          <li>
            <Link to="/login" className="link">
              Sign in
            </Link>
          </li>
          <li>
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
