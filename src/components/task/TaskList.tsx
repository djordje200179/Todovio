import TaskView from "./TaskView";
import { useDispatch, useSelector } from "store/store";
import { selectAvailableTasks } from "store/tasks/selectors";
import { useEffect } from "react";
import { fetchAvailableTasks } from "store/tasks/thunks";

export default function TaskList() {	
	const dispatch = useDispatch();
	useEffect(() => { dispatch(fetchAvailableTasks()) }, [dispatch]);

	const tasks = useSelector(selectAvailableTasks);

	return (
		<main className="d-flex flex-wrap">
			{tasks?.map(task =>
				task && <TaskView key={task.id} task={task}/>
			)}
		</main>
	);
}