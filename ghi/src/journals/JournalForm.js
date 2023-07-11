import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotification";
import { useCreateJournalsMutation } from "../app/authApi";

function JournalForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [createJournal, result] = useCreateJournalsMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createJournal({ title, description });
      navigate("/journals");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a journal</h1>
          <ErrorNotification error={error} />
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
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JournalForm;
