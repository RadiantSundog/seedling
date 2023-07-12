import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetGardensQuery, useDeleteGardenMutation } from "../app/authApi";
import { useSelector } from "react-redux";

const GardenDetails = () => {
  const { garden_id } = useParams();

  const { data: gardens } = useGetGardensQuery();
  console.log(gardens);
  const garden = useSelector((state) =>
    gardens ? gardens.find((garden) => garden.id === garden_id) : null
  );

  const [deleteGarden, { isLoading, isError, error }] =
    useDeleteGardenMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your garden?"
    );
    if (confirmed) {
      deleteGarden(garden.id)
        .then(() => {
          navigate("/gardens");
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <h2>My Garden</h2>
      {garden ? (
        <div>
          <h3>{garden.name}</h3>
          <p>{garden.location}</p>
          <button onClick={handleDelete} disabled={isLoading}>
            Delete
          </button>
          {isError && <div>Error: {error.message}</div>}
          <Link to="/gardens" className="btn btn-primary">
            Back to Gardens
          </Link>
        </div>
      ) : (
        <div>Loading garden...</div>
      )}
    </div>
  );
};

export default GardenDetails;
