import ErrorNotification from "../ErrorNotification";
import { useGetPlantsQuery, useDeletePlantMutation } from "../app/authApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PlantLists() {
  const { data: plants, error, isLoading } = useGetPlantsQuery();

  const { plant_id } = useParams();
  const plant = useSelector((state) =>
    plants ? plants.find((plant) => plant.id === plant_id) : null
  );

  const [deletePlant, { isError }] = useDeletePlantMutation();
  const navigate = useNavigate();
  const handleDelete = async (plantId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your garden?"
    );
    if (confirmed) {
      deletePlant(plantId)
        .then(() => {
          navigate("/plants");
        })
        .catch((error) => {});
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <div className="container">
        <div className="card shadow p-4 mt-4">
          <h1>My Plants</h1>
          <ErrorNotification error={error} />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Location</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => {
                return (
                  <tr key={plant.id}>
                    <td>
                      <img
                        src={plant.plant_picture}
                        style={{ width: "80px", height: "60px" }}
                      />
                    </td>
                    <td>
                      <Link to={`/plants/${plant.id}`} className="btn btn-primary">
                        {plant.name}
                      </Link>
                    </td>
                    <td>{plant.garden.name}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(plant.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                      {isError && <div>Error: {error.message}</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/plants/create"
              className="btn btn-secondary btn-lg px-4 gap-3"
            >
              Plant A Plant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantLists;
