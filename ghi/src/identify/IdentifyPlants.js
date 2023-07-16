import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdentifiedPlant, setError, clearError } from "../app/identifySlice";
import API_KEY from "./config";

function IdenfityPlants() {
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

      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("https://plant.id/api/v3/identification", {
        method: "post",
        headers: {
          Authorization: API_KEY,
        },
        body: formData,
      });
      const data = await response.json();
      const identifiedPlant = data;
      dispatch(setIdentifiedPlant(identifiedPlant));
    } catch (error) {
      console.error(error);
      dispatch(setError("An error occurred while idtenfiying the plant"));
    }
  };
  return (
    <div>
      <h1>Identify the plant</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Identify</button>
      </form>
    </div>
  );
}

export default IdenfityPlants;
