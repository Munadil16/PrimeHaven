import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        document.querySelector(".pass-length").classList.add("block");
      } else {
        document.querySelector(".pass-length").classList.remove("block");

        const res = await axios.post("/api/user/signup", {
          email: email,
          username: user,
          password: password,
        });

        if (res.data.userAvailable) {
          document
            .querySelector(".user-not-available")
            .classList.remove("inline-block");
          navigate("/login");
        } else {
          document
            .querySelector(".user-not-available")
            .classList.add("inline-block");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const input = document.getElementById("password");
    showPassword
      ? input.setAttribute("type", "text")
      : input.setAttribute("type", "password");
  }, [showPassword]);

  return (
    <div className="signup-form">
      <div className="signup-header">
        <h1>Create an account</h1>
      </div>

      <div className="signup-controls">
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="email">
            Enter your email
            <span className="red-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="eg: john03@outlook.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="username">
            Enter username
            <span className="red-star">*</span>
            <span className="user-not-available">Username not available!</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="eg: John"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="password">
            Enter password
            <span className="red-star">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="pass-length">
            Password must be atleast 6 characters!
          </span>

          <input
            type="checkbox"
            id="show-password"
            value={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="show-password">Show Password</label>

          <button type="submit">
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </form>
      </div>

      <div className="link-to-signin">
        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2f81f7" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
