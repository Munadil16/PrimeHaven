import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellProperty.css";

const SellProperty = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [owner, setOwner] = useState("");
  const [type, setType] = useState("House");
  const [place, setPlace] = useState("Andhra Pradesh");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [states, setStates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("owner", owner);
    formData.append("type", type);
    formData.append("place", place);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("desc", desc);

    const res = await axios.post("/api/sell-property", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.insertedProperty) {
      alert("Property Added!");
    }
  };

  useEffect(() => {
    const checkSignedIn = async () => {
      const res = await axios.get("/api/logged-in");
      if (res.data.isLoggedIn === false) {
        navigate("/login");
      } else {
        setOwner(res.data.username);
      }
    };

    const getStates = async () => {
      const res = await axios.get("/api/states");
      setStates(res.data);
    };

    checkSignedIn();
    getStates();
  }, []);

  return (
    <div className="sell-property">
      <h1>Property Details</h1>

      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="prop-info">
          <label htmlFor="owner">Property owned by</label>
          <input
            type="text"
            id="owner"
            value={owner}
            readOnly
            autoComplete="off"
            required
          />

          <label htmlFor="type">Property type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Farm House">Farm House</option>
          </select>

          <label htmlFor="place">Place</label>
          <select
            name="places"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          >
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="prop-image-desc">
          <input
            type="file"
            name="image"
            accept="image/*"
            alt="Property Image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <p>Minimum file size: 2MB</p>

          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            id="title"
            placeholder="Eg: Paradise Resort"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="desc">Property Details</label>
          <textarea
            id="desc"
            placeholder="This property provides..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            autoComplete="off"
            required
          ></textarea>

          <button type="submit">Add Property</button>
        </div>
      </form>
    </div>
  );
};

export default SellProperty;
