import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdentifiedPlant, setError, clearError } from "../app/identifySlice";
import "./IdentifyForm.css";

function IdentifyPlants() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.plantIdentification.error);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(clearError());
      // const data = await response.json();
      // const identifiedPlant = data;
      // dispatch(setIdentifiedPlant(identifiedPlant));
    } catch (error) {
      console.error(error);
      dispatch(setError("An error occurred while identifying the plant"));
    }
  };

  return (
    <div>
      <h1>Identify a plant</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          className="form-control form-control-lg"
          onChange={handleImageUpload}
        />
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Identify
        </button>
      </form>
    </div>
  );
}

export default IdentifyPlants;
