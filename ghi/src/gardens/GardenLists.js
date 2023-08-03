import ErrorNotification from "../ErrorNotification";
import { useGetGardensQuery } from "../app/authApi";
import { Link } from "react-router-dom";

function GardenLists() {
  const { data, error, isLoading } = useGetGardensQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <ErrorNotification error={error} />
        <h1>My Gardens</h1>
        <Link to="create" className="btn btn-primary">
          Start A Garden
        </Link>
        {data.map((garden) => (
          <div className="card mt-4" key={garden.id}>
            <div className="card-body">
              <h5 className="card-title">{garden.name}</h5>
              <p className="card-text">{garden.location}</p>
              <Link to={`/gardens/${garden.id}`} className="btn btn-primary">
                See My Gardens
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GardenLists;
