import TaskItem from "./TaskItem";

export default function TaskList({ tasks, setTasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
}
