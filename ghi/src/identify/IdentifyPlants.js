import React, { useState } from "react";
import { useAddIdentifyMutation } from "../app/identifySlice";
import "./IdentifyForm.css";

function IdentifyPlants() {
  const [image, setImage] = useState(null);

  const [identifyPlants, { isLoading, data, error }] = useAddIdentifyMutation();

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      await identifyPlants(image);
    }
  };

  return (
    <div className="container">
      <div className="card-2 shadow p-4 mt-4 small-card">
        <h1>Identify a plant</h1>
        {error && <div>Error: {error.message}</div>}
        <form onSubmit={handleSubmit} className="small-form">
          <div className="form-floating mb-3">
            <input
              name="file"
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
        {isLoading && <div>Loading...</div>}
        {data && (
          <div>
            <h2>Identification Result</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdentifyPlants;
