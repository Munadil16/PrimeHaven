import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        username: userName,
        password: passWord,
      });

      if (res.data.userFound) {
        document.querySelector(".wrong").classList.remove("block");
        window.location.href = "/";
      } else {
        document.querySelector(".wrong").classList.add("block");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const passWordInput = document.getElementById("password");
    if (showPassWord) {
      passWordInput.setAttribute("type", "text");
    } else {
      passWordInput.setAttribute("type", "password");
    }
  }, [showPassWord]);

  return (
    <div className="login-form">
      <div className="login-header">
        <h1 className="login-h1">Login to PrimeHaven</h1>
      </div>

      <div className="login-controls">
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />

          <span className="wrong">Wrong name or password. Try again! </span>

          <input
            type="checkbox"
            id="show-password"
            value={showPassWord}
            onChange={(e) => setShowPassWord(e.target.checked)}
          />
          <label htmlFor="show-password">Show Password</label>

          <button type="submit">Sign in</button>
        </form>
      </div>

      <div className="link-to-signup">
        <p>or</p>
        <p>
          New to PrimeHaven?{" "}
          <Link to="/signup" style={{ color: "#2f81f7" }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
