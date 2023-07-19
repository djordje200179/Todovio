import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentUserId } from "../users/selectors";
import { TasksItemsMap, TasksMap } from "./slice";

export const selectOwnTasks = createSelector(
	[
		(state: RootState) => state.tasks.tasks,
		selectCurrentUserId,
	],
	(tasks: TasksMap, userId: number | null) => userId ? tasks[userId] : []
);

export const selectGroupTasks = createSelector(
	[
		(state: RootState, groupId: number) => state.tasks.tasks,
		(state: RootState, groupId: number) => groupId
	],
	(tasks: TasksMap, groupId: number) => groupId ? tasks[groupId] : []
);

export const selectAvailableTasks = (state: RootState) => 
	Object.values(state.tasks.tasks).flat();

export const selectTaskItems = createSelector(
	[
		(state: RootState, taskId: number) => state.tasks.taskItems,
		(state: RootState, taskId: number) => taskId
	],
	(taskItems: TasksItemsMap, taskId: number) => taskItems[taskId]
);