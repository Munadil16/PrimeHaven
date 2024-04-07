import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Profile.css";
import ProfileProperty from "../../components/ProfileProperty";
import DefaultProfilePic from "../../assets/images/DefaultProfile.png";
import whiteLine from "../../assets/images/WhiteLine.png";

const Profile = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [boughtProperties, setBoughtProperties] = useState([]);
  const [sellingProperties, setSellingProperties] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userLoggedIn = await axios.get("/api/logged-in");
      setUser(userLoggedIn.data.isLoggedIn ? userLoggedIn.data.username : "");
      setEmail(userLoggedIn.data.isLoggedIn ? userLoggedIn.data.email : "");
    };

    const fetchProperties = async () => {
      const res = await axios.post("/api/profile", { user });
      setBoughtProperties(res.data.propsBought);
      setSellingProperties(res.data.propsSelling);
    };

    fetchUser();
    fetchProperties();
  }, [user]);

  const showBoughtProperties = () => {
    document.querySelector(".bought-properties").classList.remove("display");
    document.querySelector(".selling-properties").classList.add("display");
    document
      .querySelector(".user-properties > p:first-child")
      .classList.add("color");
    document
      .querySelector(".user-properties > p:last-child")
      .classList.remove("color");
  };

  const showSellingProperties = () => {
    document.querySelector(".bought-properties").classList.add("display");
    document.querySelector(".selling-properties").classList.remove("display");
    document
      .querySelector(".user-properties > p:first-child")
      .classList.remove("color");
    document
      .querySelector(".user-properties > p:last-child")
      .classList.add("color");
  };

  return (
    <div className="user-profile" onLoad={showBoughtProperties}>
      <div className="user-details">
        <img src={DefaultProfilePic} alt="Profile Picture" />
        <div>
          <p>{user}</p>
          <p>Contact: {email}</p>
        </div>
      </div>

      <div className="user-properties">
        <p onClick={showBoughtProperties}>Bought Properties</p>
        <img className="line" src={whiteLine} alt="Line" />
        <p onClick={showSellingProperties}>Selling Properties</p>
      </div>

      <div className="bought-properties">
        {boughtProperties.map((property) => (
          <ProfileProperty key={property.id} property={property} />
        ))}
      </div>

      <div className="selling-properties">
        {sellingProperties.map((property) => (
          <ProfileProperty key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
