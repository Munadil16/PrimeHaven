import React from "react";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import closeImage from "../assets/images/close.png";

const PropertyDesc = ({ property, close }) => {
  const navigate = useNavigate();
  const [days, setDays] = useState(1);
  const {
    id,
    owner,
    propimage,
    propertytype,
    state,
    price,
    title,
    description,
  } = property;
  const totalPrice = days * price + Math.round((18 / 100) * price);

  const handleReserve = async (e) => {
    e.preventDefault();

    const loginResponse = await axios.get("/api/logged-in");

    if (loginResponse.data.isLoggedIn === false) {
      navigate("/login");
    } else {
      localStorage.setItem("property_id", id);

      const stripe = await loadStripe(
        `${import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY}`
      );

      const res = await axios.post("/api/payment", {
        name: `${title} - ${propertytype}`,
        price: totalPrice,
      });

      stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
    }
  };

  return (
    <div className="property-desc">
      <p className="title">{title}</p>
      <p className="state">- {state}</p>
      <img src={propimage} alt="property-image" className="image" />
      <img src={closeImage} alt="close" className="close" onClick={close} />

      <div className="details-and-pricing">
        <div className="details">
          <p className="owner">Property Owned by {owner}</p>
          <p className="about">About property:</p>
          <p className="desc">{description}</p>
        </div>

        <div className="pricing">
          <form onSubmit={handleReserve} method="post">
            {propertytype === "Farm House" && (
              <>
                <label htmlFor="days-stay">Number of days staying: </label>
                <input
                  type="number"
                  min={1}
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="days"
                  id="days-stay"
                />
              </>
            )}
            <p className="total-price">
              {propertytype === "House"
                ? `Total Price (with GST) = ₹ ${totalPrice} per month`
                : `Total Price (with GST) = ₹ ${totalPrice}`}
            </p>
            <button type="submit" className="reserve">
              Reserve
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDesc;
