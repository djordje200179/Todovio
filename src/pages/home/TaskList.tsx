import TaskView from "./TaskView";
import { useDispatch, useSelector } from "../../store/store";
import {selectAvailableTasks} from "../../store/tasks/selectors";
import { useEffect } from "react";
import {fetchAvailableTasks} from "../../store/tasks/thunks";
import {selectCurrentUserGroupIds, selectCurrentUserId} from "../../store/users/selectors";

export default function TaskList() {
	const userId = useSelector(selectCurrentUserId);
	const groupIds = useSelector(selectCurrentUserGroupIds);

	const dispatch = useDispatch();

	useEffect(() => { dispatch(fetchAvailableTasks(true)) }, [userId, groupIds, dispatch]);

	const tasks = useSelector(selectAvailableTasks);

	return (
		<main className="d-flex flex-wrap bg-secondary">
			{tasks?.map(task =>
				<TaskView key={task.id} task={task}/>
			)}
		</main>
	);
}