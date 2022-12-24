import PropTypes from "prop-types";
import Task from "./Task";
const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
};

Tasks.defaultProp = {
  title: "tasks",
};
Tasks.propType = {
  tasks: PropTypes.array,
};

export default Tasks;
