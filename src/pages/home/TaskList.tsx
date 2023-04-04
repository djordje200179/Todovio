import TaskView from "./TaskView";
import { useDispatch, useSelector } from "../../store/store";
import { selectOwnTasks } from "../../store/tasks/selectors";
import { useEffect } from "react";
import { fetchOwnTasks } from "../../store/tasks/thunks";

export default function TaskList() {
	const dispatch = useDispatch();

	useEffect(() => { dispatch(fetchOwnTasks(true)); }, [dispatch]);

	const tasks = useSelector(state => selectOwnTasks(state))!;

	return (
		<main className="d-flex flex-wrap bg-secondary">
			{tasks?.map(task =>
				<TaskView key={task.uid} task={task}/>
			)}
		</main>
	);
}