import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxTaskModel } from "./models";

export type GroupTasksMap = { [groupUid: string]: ReduxTaskModel[] };

interface TasksState {
	ownTasks: ReduxTaskModel[];
	groupTasks: GroupTasksMap;
}

const slice = createSlice({
	name: "tasks",
	initialState: {
		ownTasks: [],
		groupTasks: {}
	} as TasksState,
	reducers: {
		resetTasks(state: TasksState) {
			state.ownTasks   = [];
			state.groupTasks = {};
		},
		setTasks: {
			reducer(state: TasksState, action: PayloadAction<{ groupUid: string | null, tasks: ReduxTaskModel[] }>) {
				const { groupUid, tasks } = action.payload;

				if (groupUid === null)
					state.ownTasks = tasks;
				else
					state.groupTasks[groupUid] = tasks;
			},
			prepare(groupUid: string | null, tasks: ReduxTaskModel[]) {
				return { payload: { groupUid, tasks } };
			}
		},
		toggleTaskItem: {
			reducer(state: TasksState, action: PayloadAction<{ groupUid: string | null, taskUid: string, itemIndex: number }>) {
				const { groupUid, taskUid, itemIndex } = action.payload;

				const tasks = groupUid === null ? state.ownTasks : state.groupTasks[groupUid];
				const task = tasks.find(t => t.uid === taskUid)!;
				const item = task.items[itemIndex];

				item.completed = !item.completed;
			},
			prepare(groupUid: string | null, taskUid: string, itemIndex: number) {
				return {
					payload: { groupUid, taskUid, itemIndex }
				};
			}
		},
		changeTaskItemText: {
			reducer(state: TasksState, action: PayloadAction<{ groupUid: string | null, taskUid: string, itemIndex: number, newText: string }>) {
				const { groupUid, taskUid, itemIndex, newText } = action.payload;

				const tasks = groupUid === null ? state.ownTasks : state.groupTasks[groupUid];
				const task = tasks.find(t => t.uid === taskUid)!;
				const item = task.items[itemIndex];

				item.text = newText;
			},
			prepare(groupUid: string | null, taskUid: string, itemIndex: number, newText: string) {
				return {
					payload: { groupUid, taskUid, itemIndex, newText }
				};
			}
		}
	}
});

export default slice.reducer;

export const {
	resetTasks,
	setTasks,
	toggleTaskItem,
	changeTaskItemText
} = slice.actions;