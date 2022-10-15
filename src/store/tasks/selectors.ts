import { RootState } from "../store";
import { ReduxTaskModel, taskConverter } from "./models";
import { createSelector } from "@reduxjs/toolkit";
import { GroupTasksMap } from "./slice";

export const selectOwnTasks = createSelector(
	[
		(state: RootState) => state.tasks.ownTasks
	],
	(tasks: ReduxTaskModel[]) => {
		return tasks.map(taskConverter);
	}
);

export const selectGroupTasks = createSelector(
	[
		(state: RootState, groupUid: string) => state.tasks.groupTasks,
		(state: RootState, groupUid: string) => groupUid
	],
	(tasksMap: GroupTasksMap, groupUid: string) => {
		const tasks = tasksMap[groupUid];
		return tasks?.map(taskConverter);
	}
);

export const selectAllGroupTasks = createSelector(
	[
		(state: RootState) => state.tasks.groupTasks
	],
	(tasksMap: GroupTasksMap) => {
		const tasks = Object.values(tasksMap).flat();
		return tasks.map(taskConverter);
	}
);