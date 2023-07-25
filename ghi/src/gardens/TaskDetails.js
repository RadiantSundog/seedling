import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetTasksQuery, useDeleteTaskMutation } from "../app/authApi";
import { useSelector } from "react-redux";

const TaskDetails = () => {
  const { task_id } = useParams();

  const { data: tasks } = useGetTasksQuery();
  const task = useSelector((state) =>
    tasks ? tasks.find((task) => task.id === task_id) : null
  );

  const [deleteTask, { isLoading, isError, error }] = useDeleteTaskMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your garden?"
    );
    if (confirmed) {
      deleteTask(task.id)
        .then(() => {
          navigate("/tasks");
        })
        .catch((error) => {});
    }
  };

  const formattedDate = task
    ? new Date(task.due_date).toLocaleDateString()
    : "";
  const formattedTime = task
    ? new Date(task.due_date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

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
        {task ? (
          <div>
            <h2 style={titleStyle}>{task.title}</h2>
            <p style={descriptionStyle}>{task.description}</p>
            <p>Date: {formattedDate}</p>
            <p>Time: {formattedTime}</p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                className="btn btn-primary"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
            {isError && <div>Error: {error.message}</div>}
            <Link to="/tasks" className="btn btn-primary">
              Back to Tasks
            </Link>
          </div>
        ) : (
          <div>Loading task...</div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
