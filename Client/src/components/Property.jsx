import React from "react";

const Property = ({ image, title, state, price, type, view }) => {
  let priceInfo;

  if (type === "House") {
    priceInfo = "per month";
  } else if (type === "Farm House") {
    priceInfo = "per night";
  } else {
    priceInfo = "";
  }

  return (
    <div className="property" onClick={view}>
      <img src={image} alt="Property Image" className="property-image" />
      <p className="property-title">{title}</p>
      <p className="property-place">{state}</p>
      <p className="property-price">{`₹${price} ${priceInfo}`}</p>
    </div>
  );
};

export default Property;
