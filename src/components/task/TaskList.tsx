import TaskView from "./TaskView";
import { useSelector } from "store/store";
import { selectAvailableTasks } from "store/tasks/selectors";

export default function TaskList() {
	const tasks = useSelector(selectAvailableTasks);

	return (
		<main className="d-flex flex-wrap">
			{tasks?.map(task =>
				task && <TaskView key={task.id} task={task}/>
			)}
		</main>
	);
}