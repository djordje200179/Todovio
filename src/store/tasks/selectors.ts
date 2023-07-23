import { RootState } from "../store";
import { selectCurrentUserId } from "../users/selectors";

export function selectOwnTasks(state: RootState) {
	const userId = selectCurrentUserId(state);
	if (!userId)
		return null;

	return state.tasks.tasks[userId];
}

export function selectGroupTasks(state: RootState, groupId: number) {
	return state.tasks.tasks[groupId];
}

export function selectAvailableTasks(state: RootState) {
	return Object.values(state.tasks.tasks).flat();
}

export function selectTaskItems(state: RootState, taskId: number) {
	return state.tasks.taskItems[taskId];
}