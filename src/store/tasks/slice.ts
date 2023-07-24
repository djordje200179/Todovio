import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Database } from "supabase/models";

export type TaskModel = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskItemModel = Database["public"]["Tables"]["task_items"]["Row"];
export type TasksMap = { [ownerId: string]: TaskModel[] };
export type TasksItemsMap = { [taskId: string]: TaskItemModel[] };

interface TasksState {
	tasks: TasksMap;
	taskItems: TasksItemsMap;
}

const slice = createSlice({
	name: "tasks",
	initialState: {
		tasks: {},
		taskItems: {}
	} as TasksState,
	reducers: {
		resetTasks(state: TasksState) {
			state.tasks = {};
			state.taskItems = {};
		},
		setTasks(state: TasksState, action: PayloadAction<TaskModel[]>) {
			const tasks = {} as TasksMap;

			action.payload.forEach(task => {
				if (!tasks[task.owner])
					tasks[task.owner] = [];

				tasks[task.owner].push(task);
			});

			state.tasks = tasks;
		},
		setTasksItems(state: TasksState, action: PayloadAction<TaskItemModel[]>) {
			const taskItems = {} as TasksItemsMap;

			action.payload.forEach(item => {
				if (!taskItems[item.task_id])
					taskItems[item.task_id] = [];

				taskItems[item.task_id].push(item);
			});

			state.taskItems = taskItems;
		},
		changeTaskItemCompleted: {
			reducer(state: TasksState, action: PayloadAction<{ taskId: number, itemId: number, newState: boolean }>) {
				const { taskId, itemId, newState } = action.payload;

				const item = state.taskItems[taskId].find(item => item.item_id === itemId);
				if(!item) {
					console.error("The item does not exist");
					return;
				}

				item.completed = newState;
			},
			prepare(taskId: number, itemId: number, newState: boolean) {
				return {
					payload: { taskId, itemId, newState }
				};
			}
		},
		changeTaskItemText: {
			reducer(state: TasksState, action: PayloadAction<{ taskId: number, itemId: number, newText: string }>) {
				const { taskId, itemId, newText } = action.payload;

				const item = state.taskItems[taskId].find(item => item.item_id === itemId);
				if(!item) {
					console.error("The item does not exist");
					return;
				}
				
				item.text = newText;
			},
			prepare(taskId: number, itemId: number, newText: string) {
				return {
					payload: { taskId, itemId, newText }
				};
			}
		}
	}
});

export default slice.reducer;

export const {
	resetTasks,
	setTasks,
	setTasksItems,
	changeTaskItemCompleted,
	changeTaskItemText
} = slice.actions;