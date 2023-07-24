import { Thunk } from "../store";
import { selectAvailableTasks } from "./selectors";
import { TaskItemModel, TaskModel, setTasks, setTasksItems } from "./slice";
import supabaseClient from "../../supabase/client";

export function fetchAvailableTasks(force?: boolean): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state   = getState();
		const oldData = selectAvailableTasks(state);

		if (!force && oldData.length > 0)
			return;

		const tasks = await supabaseClient.from("tasks").select("*");

		if (tasks.error) {
			console.error(tasks.error);
			return;
		}

		dispatch(setTasks(tasks.data));

		const tasksItems = await supabaseClient.from("task_items").select("*");

		if (tasksItems.error) {
			console.error(tasksItems.error);
			return;
		}

		dispatch(setTasksItems(tasksItems.data));
	};
}

export function updateTask(task: TaskModel): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const { error } = await supabaseClient.from("tasks").update(task).eq("id", task.id);

		if (error) {
			console.error(error);
			return;
		}
	};
}

export function updateTaskItem(taskItem: TaskItemModel): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const { error } = await supabaseClient.from("task_items")
			.update(taskItem)
			.eq("task_id", taskItem.task_id).eq("item_id", taskItem.item_id);

		if (error) {
			console.error(error);
			return;
		}
	}
}

export function createNewTask(text: string): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		// const newTaskRequest = {
		// 	text,
		// 	created: serverTimestamp(),
		// 	edited: serverTimestamp()
		// };
		//
		// const taskDocRef  = await addDoc(getTasksColRef(getState()), newTaskRequest);
		// const taskDocSnap = await getDoc(taskDocRef);
		//
		// if (taskDocSnap.exists()) {
		// 	const newTask = {
		// 		id: taskDocSnap.id,
		// 		text: taskDocSnap.data().text,
		// 		created: taskDocSnap.data().created,
		// 		edited: taskDocSnap.data().edited
		// 	};
		//
		// 	dispatch(appendTask(newTask));
		// }
	};
}