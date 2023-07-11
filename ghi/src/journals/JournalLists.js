import ErrorNotification from "../ErrorNotification";
import { useGetJournalsQuery } from "../app/authApi";
import { Link } from "react-router-dom";

function JournalLists() {
  const { data, error, isLoading } = useGetJournalsQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="column is-centered">
      <div className="column is-narrow">
        <ErrorNotification error={error} />
        <h1>Garden Journals</h1>
        <Link to="create" className="btn btn-primary">
          Create Journals
        </Link>
        {data.map((journal) => (
          <div className="card" key={journal.id}>
            <h5 className="card-header">Journals</h5>
            <div className="card-body">
              <h5 className="card-title">{journal.title}</h5>
              <p className="card-text">{journal.description}</p>
              <Link to={`/journals/${journal.id}`} className="btn btn-primary">
                Journal Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JournalLists;
