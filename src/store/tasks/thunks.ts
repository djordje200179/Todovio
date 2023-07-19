import { Thunk } from "../store";
import { selectAvailableTasks } from "./selectors";
import { setTasks, setTasksItems } from "./slice";
import supabaseClient from "../../supabase/client";

export function fetchAvailableTasks(force?: boolean): Thunk {
	return async (dispatch, getState) => {
		const state   = getState();
		const oldData = selectAvailableTasks(state);

		if (!force && oldData)
			return oldData;

		const tasks = await supabaseClient.from("tasks").select("*");

		if (tasks.error) {
			console.error(tasks.error);
			return null;
		}

		dispatch(setTasks(tasks.data));

		const tasksItems = await supabaseClient.from("task_items").select("*");

		if (tasksItems.error) {
			console.error(tasksItems.error);
			return null;
		}

		dispatch(setTasksItems(tasksItems.data));
	};
}

export function updateTask(taskId: number): Thunk {
	return async (dispatch, getState) => {
		// const state = getState();

		// const tasks = groupUid ? state.tasks.groupTasks[groupUid] : state.tasks.ownTasks;
		// const task = tasks.find(task => task.uid === taskUid)!;

		// const ref = doc(
		// 	firestore,
		// 	task.isGroup ? "groups" : "users", task.ownerUid, "tasks", task.uid
		// ).withConverter(taskFirestoreConverter);

		// await setDoc(ref, task);
	};
}

export function createNewTask(text: string): Thunk {
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