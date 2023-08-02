import ErrorNotification from "../ErrorNotification";
import { useGetJournalsQuery } from "../app/authApi";
import { Link } from "react-router-dom";

function JournalLists() {
  const { data, error, isLoading } = useGetJournalsQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const sortedData = data.slice().sort((a, b) => {
    return new Date(b.created_on) - new Date(a.created_on);
  });

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <h1>Garden Journals</h1>
        <ErrorNotification error={error} />
        <Link to="create" className="btn btn-primary">
          Create Journals
        </Link>
        {sortedData.map((journal) => (
          <div className="card mt-4" key={journal.id}>
            <div className="card-body">
              <h5 className="card-title">{journal.title}</h5>
              <p className="card-text">{journal.description}</p>
              <Link to={`/journals/${journal.id}`} className="btn btn-primary">
                Journal Detail
              </Link>
            </div>
            <div className="card-footer text-body-secondary">
              <p className="card-text">
                {new Date(journal.created_on).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JournalLists;
