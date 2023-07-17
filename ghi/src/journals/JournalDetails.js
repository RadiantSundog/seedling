import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetJournalsQuery, useDeleteJournalMutation } from "../app/authApi";
import { useSelector } from "react-redux";

const JournalDetails = () => {
  const { journal_id } = useParams();

  const { data: journals } = useGetJournalsQuery();
  const journal = useSelector((state) =>
    journals ? journals.find((journal) => journal.id === journal_id) : null
  );

  const [deleteJournal, { isLoading, isError, error }] =
    useDeleteJournalMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this journal?"
    );
    if (confirmed) {
      deleteJournal(journal.id)
        .then(() => {
          navigate("/journals");
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <h2>Journal Detail</h2>
      {journal ? (
        <div>
          <h3>{journal.title}</h3>
          <p>{journal.description}</p>
          <img
            src={journal.picture}
            style={{ width: "120px", height: "100px" }}
          />
          <button onClick={handleDelete} disabled={isLoading}>
            Delete
          </button>
          {isError && <div>Error: {error.message}</div>}
          <Link to="/journals" className="btn btn-primary">
            Back to Journals
          </Link>
        </div>
      ) : (
        <div>Loading journal...</div>
      )}
    </div>
  );
};

export default JournalDetails;
