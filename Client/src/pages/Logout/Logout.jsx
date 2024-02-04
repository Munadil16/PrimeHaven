import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Logout.css";
import defaultPic from "../../assets/images/DefaultProfile.png";

const Logout = () => {
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/logout");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/logged-in");
        const { username } = res.data;
        setUserName(username);
      } catch (err) {
        console.log("Error during fetching: ", err);
      }
    })();
  }, []);

  return (
    <div className="logout">
      <h1>Are you sure you want to Logout?</h1>
      <div className="logout-box">
        <img src={defaultPic} alt="profile-picture" />
        <p>
          Signed in as <span>{userName}</span>
        </p>
      </div>
      <button type="button" onClick={handleSubmit}>
        Log out
      </button>
    </div>
  );
};

export default Logout;
