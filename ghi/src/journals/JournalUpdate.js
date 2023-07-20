import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateJournalsMutation } from "../app/authApi";

function JournalUpdateForm({ journal }) {
  const [title, setTitle] = useState(journal.title);
  const [description, setDescription] = useState(journal.description);
  const [picture, setPicture] = useState(journal.picture);
  const dispatch = useDispatch();

  const [updateJournals, { isLoading, isError, error }] =
    useUpdateJournalsMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJournal = {
      id: journal.id,
      title,
      description,
      picture,
    };
    updateJournals(updatedJournal)
      .unwrap()
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Update the journal</h1>
          {/* <ErrorNotification error={error} /> */}
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                placeholder="Description"
                required
                type="text"
                name="description"
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Picture"
                required
                type="text"
                name="picture"
                id="picture"
                value={picture || ""}
                onChange={(e) => setPicture(e.target.value)}
                className="form-control"
              />
              <label htmlFor="description">Picture</label>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JournalUpdateForm;
