import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCancelGif from "../assets/images/PaymentCancel.gif";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    if (count === 0) {
      const id = localStorage.getItem("property_id");
      if (id !== null) {
        localStorage.removeItem("property_id");
      }

      navigate("/buy-property");
    }
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <img
        src={PaymentCancelGif}
        alt="Payment Cancel Gif"
        style={{
          width: "250px",
          margin: "4rem 0 0.5rem 0",
        }}
      />
      <p style={{ textAlign: "center", color: "#a6a6a6" }}>
        The Payment was unsuccessful. Please try again. <br />
        You will be redirected in {count} {count === 1 ? "second" : "seconds"}.
      </p>
    </div>
  );
};

export default PaymentCancel;
