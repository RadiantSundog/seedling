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
<<<<<<< HEAD
=======
      console.error(error);
>>>>>>> fc209e29ffd0f24592771e4c62d0bf91f584adec
      dispatch(setError("An error occurred while identifying the plant"));
    }
  };

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <h1>Identify a plant</h1>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label htmlFor="image">Upload an image</label>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Identify
          </button>
        </form>
      </div>
    </div>
  );
}

export default IdentifyPlants;
