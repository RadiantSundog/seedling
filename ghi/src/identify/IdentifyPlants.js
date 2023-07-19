import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdentifiedPlant, setError, clearError } from "../app/identifySlice";

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
      formData.append("file", image);

      const response = await fetch("/identify-plant", {
        method: "post",
        body: formData,
      });

      if (response.ok) {
        const plantInfo = await response.json();
        dispatch(setIdentifiedPlant(plantInfo));
      } else {
        throw new Error("An error occurred while identifying the plant");
      }
    } catch (error) {
      dispatch(setError("An error occurred while identifying the plant"));
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
