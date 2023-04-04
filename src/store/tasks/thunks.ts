import { Thunk } from "../store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { taskConverter, taskFirestoreConverter, TaskModel} from "./models";
import { setTasks } from "./slice";
import {selectCurrentUserGroupUids, selectCurrentUserUid} from "../users/selectors";
import {selectAllGroupTasks, selectGroupTasks, selectOwnTasks} from "./selectors";

export function fetchGroupTasks(groupUid: string, force?: boolean): Thunk<Promise<TaskModel[] | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectGroupTasks(state, groupUid);

		if (!force && oldData)
			return oldData;

		const ref  = collection(firestore, "groups", groupUid, "tasks").withConverter(taskFirestoreConverter);
		const snap = await getDocs(ref);

		const tasks = snap.docs.map(doc => doc.data());
		dispatch(setTasks(groupUid, tasks));

		return tasks.map(taskConverter);
	}
}

export function fetchAllGroupTasks(force?: boolean): Thunk<Promise<TaskModel[] | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectAllGroupTasks(state);

		if (!force && oldData)
			return oldData;

		const userUid = selectCurrentUserUid(state);
		if(!userUid)
			return null;

		const groupUids = selectCurrentUserGroupUids(state);
		if(!groupUids)
			return null;

		for (const groupUid of groupUids) {
			const ref  = collection(firestore, "groups", groupUid, "tasks").withConverter(taskFirestoreConverter);
			const snap = await getDocs(ref);

			const groupTasks = snap.docs.map(doc => doc.data());

			dispatch(setTasks(groupUid, groupTasks));
		}

		return selectAllGroupTasks(state);
	}
}

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

export function fetchAvailableTasks(force?: boolean): Thunk<Promise<TaskModel[] | null>> {
	return async (dispatch, getState) => {
		const ownTasks = await dispatch(fetchOwnTasks(force));
		const groupTasks = await dispatch(fetchAllGroupTasks(force));

		let allTasks: TaskModel[] = [];
		if(ownTasks)
			allTasks = allTasks.concat(ownTasks);
		if(groupTasks)
			allTasks = allTasks.concat(groupTasks);

		return allTasks;
	}
}

export function updateTask(groupUid : string | null, taskUid: string): Thunk {
	return async (dispatch, getState) => {
		const state = getState();

		const tasks = groupUid ? selectGroupTasks(state, groupUid)! : selectOwnTasks(state)!;
		const task = tasks.find(task => task.uid === taskUid)!;

		const ref = doc(
			firestore,
			task.isGroup ? "groups" : "users", task.ownerUid, "tasks", task.uid
		).withConverter(taskFirestoreConverter);

		await updateDoc(ref, task);
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