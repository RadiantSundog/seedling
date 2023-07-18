import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotification";
import { useCreateTasksMutation } from "../app/authApi";

function TaskForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [createTask, result] = useCreateTasksMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createTask({ title, description, due_date });
      navigate("/tasks");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Task</h1>
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="Task Title"
                required
                type="text"
                name="title"
                id="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
              <label htmlFor="description">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Task Description"
                required
                type="text"
                name="description"
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Task Complete Deadline"
                required
                type="datetime-local"
                name="due_date"
                id="due_date"
                value={due_date || ""}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-control"
              ></input>
              <label htmlFor="due_date">Due Date</label>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
