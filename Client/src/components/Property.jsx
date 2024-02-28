import React from "react";

const Property = ({ image, title, state, price }) => {
  return (
    <div className="property">
      <img src={image} alt="Property Image" className="property-image" />
      <p className="property-title">{title}</p>
      <p className="property-place">{state}</p>
      <p className="property-price">{`₹${price} per night`}</p>
    </div>
  );
};

export default Property;
