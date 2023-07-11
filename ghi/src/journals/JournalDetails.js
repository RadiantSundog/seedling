import React from "react";
import { useParams } from "react-router-dom";
import { useGetJournalsQuery } from "../app/authApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JournalDetails = () => {
  const { journal_id } = useParams();

  const { data: journals } = useGetJournalsQuery();
  console.log(journals);
  const journal = useSelector((state) =>
    journals ? journals.find((journal) => journal.id === journal_id) : null
  );

  return (
    <div>
      <h2>Journal Detail</h2>
      {journal ? (
        <div>
          <h3>{journal.title}</h3>
          <p>{journal.description}</p>
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
