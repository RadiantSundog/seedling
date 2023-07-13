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

  return (
    <div>
      <h2>My Tasks</h2>
      {task ? (
        <div>
          {/* <h3>{task.name}</h3> */}
          <p>{task.description}</p>
          <p>{task.due_date}</p>
          <button onClick={handleDelete} disabled={isLoading}>
            Delete
          </button>
          {isError && <div>Error: {error.message}</div>}
          <Link to="/tasks" className="btn btn-primary">
            Back to Tasks
          </Link>
        </div>
      ) : (
        <div>Loading task...</div>
      )}
    </div>
  );
};

export default TaskDetails;
