import ErrorNotification from "../ErrorNotification";
import { useGetPlantsQuery } from "../app/authApi";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PlantLists() {
  const { data: plants, error, isLoading } = useGetPlantsQuery();

  const { plant_id } = useParams();
  useSelector((state) =>
    plants ? plants.find((plant) => plant.id === plant_id) : null
  );

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
                        alt="plant-images"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/plants/${plant.id}`}
                        className="btn btn-primary"
                      >
                        {plant.name_id}
                      </Link>
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
              Plant-A-Plant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantLists;
