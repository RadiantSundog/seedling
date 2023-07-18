import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetPlantsQuery, useDeletePlantMutation } from "../app/authApi";
import { useSelector } from "react-redux";

const PlantDetails = () => {
  const { plant_id } = useParams();

  const { data: plants } = useGetPlantsQuery();

  const plant = useSelector((state) =>
    plants ? plants.find((plant) => plant.id === plant_id) : null
  );

  const [deletePlant, { isLoading, isError, error }] = useDeletePlantMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your garden?"
    );
    if (confirmed) {
      deletePlant(plant.id)
        .then(() => {
          navigate("/plants");
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <h2>My Plants</h2>
      {plant ? (
        <div>
          <h3>{plant.name}</h3>
          <p>{plant.garden.location}</p>
          <img
            src={plant.plant_picture}
            style={{ width: "120px", height: "100px" }}
          />
          <button onClick={handleDelete} disabled={isLoading}>
            Delete
          </button>
          {isError && <div>Error: {error.message}</div>}
          <Link to="/plants" className="btn btn-primary">
            Back to Plants
          </Link>
        </div>
      ) : (
        <div>Loading Plant...</div>
      )}
    </div>
  );
};

export default PlantDetails;