import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetGardensQuery,
  useDeleteGardenMutation,
  useGetPlantsQuery,
} from "../app/authApi";
import { useSelector } from "react-redux";

const GardenDetails = () => {
  const { garden_id } = useParams();

  const { data: gardens } = useGetGardensQuery();
  const { data: plants } = useGetPlantsQuery();

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

  const filteredPlants = plants
    ? plants.filter((plant) => plant.garden_id === garden.id)
    : [];

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <div className="card-header">
          <h2>My Garden</h2>
        </div>
        <div className="card-body">
          {garden ? (
            <div>
              <h3>{garden.name}</h3>
              <p>{garden.location}</p>
              {filteredPlants.length > 0 ? (
                <table className="table">
                  <tbody>
                    {filteredPlants.map((plant) => (
                      <tr key={plant.id}>
                        <td style={{ width: "25%" }}>
                          <img
                            src={plant.plant_picture}
                            style={{ width: "100%", height: "auto" }}
                            alt={plant.name}
                          />
                        </td>
                        <td style={{ width: "75%" }}>
                          <Link
                            to={`/plants/${plant.id}`}
                            className="btn btn-primary"
                            style={{ width: "50%" }}
                          >
                            {plant.name_id}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No plants found.</div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
              {isError && <div>Error: {error.message}</div>}
              <Link to="/gardens" className="btn btn-primary">
                Back to Gardens
              </Link>
            </div>
          ) : (
            <div>Loading garden...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GardenDetails;
