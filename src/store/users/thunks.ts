import { Thunk } from "../store";
import { setUser } from "./slice";
import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, userFirestoreConverter, UserModel } from "./models";
import {selectCurrentUserUid, selectUser} from "./selectors";

export function fetchUser(uid: string, force?: boolean): Thunk<Promise<UserModel | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectUser(state, uid);

		if(!force && oldData)
			return oldData;

		const ref  = doc(firestore, "users", uid).withConverter(userFirestoreConverter);
		const snap = await getDoc(ref);

		if (!snap.exists())
			return null;

		const user = snap.data();
		dispatch(setUser(user));

		return userConverter(user);
	};
}

export function fetchCurrentUser(force?:boolean) : Thunk<Promise<UserModel | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const userUid = selectCurrentUserUid(state);

		if(!userUid)
			return null;

		return dispatch(fetchUser(userUid, force));
	};
}