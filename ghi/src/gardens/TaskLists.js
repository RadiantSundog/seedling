import ErrorNotification from "../ErrorNotification";
import { useGetTasksQuery, useDeleteTaskMutation } from "../app/authApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskLists() {
  const { data: tasks, error, isLoading } = useGetTasksQuery();

  const { task_id } = useParams();

  const task = useSelector((state) =>
    tasks ? tasks.find((task) => task.id === task_id) : null
  );

  const [deleteTask, { isError }] = useDeleteTaskMutation();
  const navigate = useNavigate();
  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your garden?"
    );
    if (confirmed) {
      deleteTask(taskId)
        .then(() => {
          navigate("/tasks");
        })
        .catch((error) => {});
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ErrorNotification error={error} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <Link to={`/tasks/${task.id}`} className="btn btn-primary">
                    {task.description}
                  </Link>
                </td>
                <td>{task.due_date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                  {isError && <div>Error: {error.message}</div>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link
          to="/tasks/create"
          className="btn btn-secondary btn-lg px-4 gap-3"
        >
          Add a task
        </Link>
      </div>
    </div>
  );
}

export default TaskLists;
