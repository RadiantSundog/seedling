import ErrorNotification from "../ErrorNotification";
import { useGetTasksQuery } from "../app/authApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

function TaskLists() {
  const { data: tasks, error, isLoading } = useGetTasksQuery();

  const { task_id } = useParams();

  useSelector((state) =>
    tasks ? tasks.find((task) => task.id === task_id) : null
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const calendar_tasks = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: moment(task.due_date).toDate(),
    end: moment(task.due_date).toDate(),
  }));

  const handleDetail = (event) => {
    navigate(`/tasks/${event.id}`);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ErrorNotification error={error} />
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={calendar_tasks}
          startAccessor="start"
          endAccessor="end"
          tooltipAccessor="title"
          onSelectEvent={handleDetail}
        />
      </div>
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
