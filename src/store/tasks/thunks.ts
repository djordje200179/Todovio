import { Thunk } from "../store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { taskConverter, taskFirestoreConverter, TaskModel } from "./models";
import { resetEdited, setTasks } from "./slice";
import { selectCurrentUserUid } from "../users/selectors";
import { selectOwnTasks } from "./selectors";

export function fetchOwnTasks(force?: boolean): Thunk<Promise<TaskModel[] | null>> {
	return async (dispatch, getState) => {
		const state   = getState();
		const oldData = selectOwnTasks(state);

		if (!force && oldData)
			return oldData;

		const userUid = selectCurrentUserUid(state);
		if(!userUid)
			return null;

		const ref  = collection(firestore, "users", userUid, "tasks").withConverter(taskFirestoreConverter);
		const snap = await getDocs(ref);

		const tasks = snap.docs.map(doc => doc.data());
		dispatch(setTasks(null, tasks));

		return tasks.map(taskConverter);
	};
}

export function updateTask(taskUid: string): Thunk {
	return async (dispatch, getState) => {
		const state = getState();
		const tasks = state.tasks.ownTasks;
		const task  = tasks.find(task => task.uid === taskUid)!;

		const userUid = selectCurrentUserUid(state);
		if(!userUid)
			return;

		const ref = doc(firestore, "users", userUid, "tasks", taskUid).withConverter(taskFirestoreConverter);
		await updateDoc(ref, task);

		dispatch(resetEdited(null, taskUid));
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