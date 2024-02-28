import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./BuyProperty.css";
import SearchIcon from "../../../assets/images/SearchIcon.png";
import Property from "../../../components/Property";

const BuyProperty = () => {
  const [states, setStates] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const res = await axios.get("/api/states");
      setStates(res.data);
    };

    const getProperties = async () => {
      const res = await axios.get("/api/properties");
      setProperties(res.data);
    };

    getStates();
    getProperties();
  }, []);

  const handleSearchClick = () => {};

  return (
    <div className="buy-property-div">
      <form method="post">
        <div className="search-bar">
          <input type="text" id="search" name="search" autoComplete="off" />
          <img src={SearchIcon} alt="Search Icon" onClick={handleSearchClick} />
        </div>

        <div className="select-prop-type">
          <label htmlFor="prop-types">Property Type</label>
          <select name="prop-types" id="prop-types">
            <option value="All">All</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Farm House">Farm House</option>
          </select>
        </div>

        <div className="select-place">
          <label htmlFor="places">Place</label>
          <select name="places" id="places">
            <option value="All">All</option>
            {states.map((state) => (
              <option key={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="display-props">
        {properties.map((property) => (
          <Property
            key={property.id}
            image={property.propimage}
            title={property.title}
            state={property.state}
            price={property.price}
          />
        ))}
        {properties.map((property) => (
          <Property
            key={property.id}
            image={property.propimage}
            title={property.title}
            state={property.state}
            price={property.price}
          />
        ))}
        {properties.map((property) => (
          <Property
            key={property.id}
            image={property.propimage}
            title={property.title}
            state={property.state}
            price={property.price}
          />
        ))}
        {properties.map((property) => (
          <Property
            key={property.id}
            image={property.propimage}
            title={property.title}
            state={property.state}
            price={property.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyProperty;
