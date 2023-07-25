import React, { useRef, useEffect, useState } from "react";
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

  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      const aspectRatio = naturalWidth / naturalHeight;
      const newWidth = Math.floor(naturalWidth * 0.25);
      const newHeight = Math.floor(newWidth / aspectRatio);
      setImageDimensions({ width: newWidth, height: newHeight });
    }
  }, []);

  const cardStyle = {
    fontFamily: "'Work Sans', sans-serif",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
  };

  const descriptionStyle = {
    fontSize: "1rem",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4" style={cardStyle}>
        <h2 style={titleStyle}>{journal?.title}</h2>
        <p style={descriptionStyle}>{journal?.description}</p>
        <img
          ref={imageRef}
          src={journal?.picture}
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
          }}
          alt="journal_picture"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="btn btn-primary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </button>
          <Link to="/journals" className="btn btn-primary">
            Back to Journals
          </Link>
        </div>
        {isError && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default JournalDetails;
