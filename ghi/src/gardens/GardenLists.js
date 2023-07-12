import ErrorNotification from "../ErrorNotification";
import { useGetGardensQuery } from "../app/authApi";
import { Link } from "react-router-dom";

function GardenLists() {
  const { data, error, isLoading } = useGetGardensQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="column is-centered">
      <div className="column is-narrow">
        <ErrorNotification error={error} />
        <h1>My Gardens</h1>
        <Link to="create" className="btn btn-primary">
          Start A Garden
        </Link>
        {data.map((garden) => (
          <div className="card" key={garden.id}>
            <h5 className="card-header">My Gardens</h5>
            <div className="card-body">
              <h5 className="card-title">{garden.name}</h5>
              <p className="card-text">{garden.location}</p>
              <Link to={`/gardens/${garden.id}`} className="btn btn-primary">
                Go to my garden
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GardenLists;
