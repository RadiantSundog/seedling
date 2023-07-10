import ErrorNotification from "../ErrorNotification";
import { useGetJournalsQuery } from "../app/authApi";

function JournalLists() {
  const { data, error, isLoading } = useGetJournalsQuery();
  console.log(data);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="column is-centered">
      <div className="column is-narrow">
        <ErrorNotification error={error} />
        <h1>Garden Journals</h1>
        <div className="card">
          <h5 className="card-header">Journals</h5>
          {data.map((journal) => (
            <div className="card-body" key={journal.id}>
              <h5 className="card-title">{journal.title}</h5>
              <p className="card-text">{journal.description}</p>
              <a href="#" className="btn btn-primary">
                Journals Detial
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JournalLists;
