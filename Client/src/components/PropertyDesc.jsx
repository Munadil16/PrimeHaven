import React from "react";
import { useState } from "react";
import closeImage from "../assets/images/close.png";

const PropertyDesc = ({ property, close }) => {
  const [days, setDays] = useState(1);
  const { propimage, owner, propertytype, state, price, title, description } =
    property;
  const totalPrice = days * price + Math.round((18 / 100) * price);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          {propertytype === "Farm House" ? (
            <form onSubmit={handleSubmit} method="post">
              <label htmlFor="days-stay">Number of days staying: </label>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="days"
                id="days-stay"
              />
              <p className="total-price">
                Total Price (with GST) = ₹ {totalPrice}
              </p>
              <button type="submit" className="reserve">
                Reserve
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} method="post">
              <p className="total-price">
                {propertytype === "House"
                  ? `Total Price (with GST) = ₹ ${totalPrice} per month`
                  : `Total Price (with GST) = ₹ ${totalPrice}`}
              </p>
              <button className="reserve">Reserve</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDesc;
