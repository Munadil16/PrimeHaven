import React from "react";

const ProfileProperty = ({ property }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        marginTop: "3rem",
        border: "1px solid",
        padding: "1rem",
        borderRadius: "1rem",
        width: "90vw",
      }}
    >
      <img
        src={property.propimage}
        alt="Property Image"
        style={{ width: "200px", borderRadius: "1rem" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          fontSize: "1.1rem",
        }}
      >
        <p>{property.title}</p>
        <p> - {property.state}</p>
        <p>Property owned by {property.owner}</p>
      </div>

      <p
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0px 3rem 0px auto",
          fontWeight: "600",
          fontSize: "1.1rem",
        }}
      >
        Price: ₹{property.price}
      </p>
    </div>
  );
};

export default ProfileProperty;
