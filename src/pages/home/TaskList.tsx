import TaskView from "./TaskView";
import { useDispatch, useSelector } from "../../store/store";
import {selectAvailableTasks} from "../../store/tasks/selectors";
import { useEffect } from "react";
import {fetchAvailableTasks} from "../../store/tasks/thunks";
import {selectCurrentUserGroupUids, selectCurrentUserUid} from "../../store/users/selectors";

export default function TaskList() {
	const userUid = useSelector(selectCurrentUserUid);
	const groupUids = useSelector(selectCurrentUserGroupUids);

	const dispatch = useDispatch();

	useEffect(() => { dispatch(fetchAvailableTasks(true)) }, [userUid, groupUids, dispatch]);

	const tasks = useSelector(selectAvailableTasks);

	return (
		<main className="d-flex flex-wrap bg-secondary">
			{tasks?.map(task =>
				<TaskView key={task.uid} task={task}/>
			)}
		</main>
	);
}