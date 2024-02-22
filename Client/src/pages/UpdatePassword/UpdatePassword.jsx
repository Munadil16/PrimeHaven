import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const [showConfirmPassWord, setShowConfirmPassWord] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      document.querySelector(".password-length").classList.add("display-block");
    } else {
      document
        .querySelector(".password-length")
        .classList.remove("display-block");
      if (newPassword !== confirmPassword) {
        document
          .querySelector(".password-not-matched")
          .classList.add("display-block");
      } else {
        document
          .querySelector(".password-not-matched")
          .classList.remove("display-block");

        const res = await axios.put("/api/update-password", {
          password: confirmPassword,
          email: email,
        });

        if (res.data.passwordUpdated) {
          alert("Password Updated!");
          window.location.href = "/login";
        }
      }
    }
  };

  useEffect(() => {
    if (showPassWord) {
      document.getElementById("new-password").setAttribute("type", "text");
    } else {
      document.getElementById("new-password").setAttribute("type", "password");
    }

    if (showConfirmPassWord) {
      document.getElementById("confirm-password").setAttribute("type", "text");
    } else {
      document
        .getElementById("confirm-password")
        .setAttribute("type", "password");
    }
  }, [showPassWord, showConfirmPassWord]);

  return (
    <div className="update-password">
      <h1>Create a new password</h1>

      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="email">
          Email <span className="red-star">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="off"
          required
        />
        <label htmlFor="new-password">
          New Password <span className="red-star">*</span>
        </label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <p className="password-length">
          Password must be atleast 6 characters!
        </p>
        <input
          type="checkbox"
          id="show-password"
          value={showPassWord}
          onChange={(e) => setShowPassWord(e.target.checked)}
        />
        <label htmlFor="show-password">Show Password</label> <br />
        <label htmlFor="confirm-password">
          Confirm Password <span className="red-star">*</span>
        </label>
        <input
          type="password"
          id="confirm-password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password by retyping it"
          required
        />
        <p className="password-not-matched">
          Password and Confirm Password didn't match!
        </p>
        <input
          type="checkbox"
          id="show-confirm-password"
          value={showConfirmPassWord}
          onChange={(e) => setShowConfirmPassWord(e.target.checked)}
        />
        <label htmlFor="show-confirm-password">Show Password</label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
