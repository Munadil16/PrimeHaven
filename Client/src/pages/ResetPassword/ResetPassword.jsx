import React from "react";
import axios from "axios";
import { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/reset-password", {
        email: email,
      });

      if (res.data.emailFound) {
        document
          .querySelector(".email-not-found")
          .classList.remove("display-block");
        alert(
          "Password reset instructions have been sent to your email address."
        );
      } else {
        document
          .querySelector(".email-not-found")
          .classList.add("display-block");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="div-reset-password">
      <h1>Reset your password</h1>

      <form method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="reset-pass"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
        <p className="email-not-found">Please enter a valid email address!</p>

        <p>
          We'll send a link to this email if it matches an existing account.
        </p>

        <button type="submit">Request password reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
