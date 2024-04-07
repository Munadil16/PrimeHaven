import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PaymentSuccessGif from "../assets/images/PaymentSuccess.gif";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    const id = localStorage.getItem("property_id");
    const isSignedIn = await axios.get("/api/logged-in");
    const sold_to = isSignedIn.data.username;
    const res = await axios.post("/api/payment-success", { id, sold_to });

    if (res.data.isInsertedIntoSoldProperty) {
      localStorage.removeItem("property_id");
      setTimeout(() => navigate("/"), 3000);
    }
  };
  handleRedirect();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <img
        src={PaymentSuccessGif}
        alt="Payment Success Gif"
        style={{ width: "200px", margin: "1rem 0 0.7rem 0" }}
      />
      <p style={{ fontSize: "2rem", fontWeight: "500", color: "#00e600" }}>
        Thank You!
      </p>
      <p style={{ fontSize: "1.1rem", marginTop: "-0.75rem" }}>
        Payment Done Successfully.
      </p>
      <p style={{ color: "#a6a6a6", textAlign: "center", marginTop: "1rem" }}>
        You will be redirected to Home Page in few seconds <br />
        or click the button below to redirect.
      </p>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "2rem",
            border: "none",
            fontSize: "1.1rem",
            backgroundColor: "#33ff33",
            cursor: "pointer",
            margin: "1rem 0 1rem 0",
          }}
        >
          Redirect
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
