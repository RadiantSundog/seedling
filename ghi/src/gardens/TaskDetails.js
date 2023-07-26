import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetTasksQuery, useDeleteTaskMutation } from "../app/authApi";
import { useSelector } from "react-redux";
import ErrorNotification from "../ErrorNotification";

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

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <div className="card-header">
          <h2>My Tasks</h2>
        </div>
        <div className="card-body">
          {task ? (
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Date: {formattedDate}</p>
              <p>Time: {formattedTime}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
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
    </div>
  );
};

export default TaskDetails;
