import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyProperty.css";
import SearchIcon from "../../../assets/images/SearchIcon.png";
import Property from "../../../components/Property";
import PropertyDesc from "../../../components/PropertyDesc";

const BuyProperty = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [propertyPlace, setPropertyPlace] = useState("All");
  const [viewProperty, setViewProperty] = useState(null);

  useEffect(() => {
    const getStates = async () => {
      const res = await axios.get("/api/states");
      setStates(res.data);
    };
    getStates();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (search.length > 0) {
      queryParams.set("search", search);
    } else {
      queryParams.delete("search");
    }
    queryParams.set("type", propertyType);
    queryParams.set("place", propertyPlace);

    const newURL = `?${queryParams.toString()}`;
    navigate(newURL);

    const getProperties = async () => {
      const res = await axios.get("/api/properties" + newURL);
      setProperties(res.data);
    };
    getProperties();
  }, [search, propertyType, propertyPlace]);

  return (
    <div className="buy-property-div">
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            autoComplete="off"
          />
          <img src={SearchIcon} alt="Search Icon" />
        </div>

        <div className="select-prop-type">
          <label htmlFor="prop-types">Property Type</label>
          <select
            name="prop-types"
            id="prop-types"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Farm House">Farm House</option>
          </select>
        </div>

        <div className="select-place">
          <label htmlFor="places">Place</label>
          <select
            name="places"
            id="places"
            value={propertyPlace}
            onChange={(e) => setPropertyPlace(e.target.value)}
          >
            <option value="All">All</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {properties.length === 0 ? (
        <div className="no-properties-matched">
          No properties matched your search!
        </div>
      ) : (
        <div className="display-props">
          {properties.map((property) => (
            <Property
              key={property.id}
              view={() => setViewProperty(property)}
              image={property.propimage}
              title={property.title}
              state={property.state}
              price={property.price}
              type={property.propertytype}
            />
          ))}
        </div>
      )}

      {viewProperty && (
        <PropertyDesc
          property={viewProperty}
          close={() => setViewProperty(null)}
        />
      )}
    </div>
  );
};

export default BuyProperty;
