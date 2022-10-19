import { Thunk } from "../store";
import { setCurrentUser, setUser } from "./slice";
import { 
	createUserWithEmailAndPassword as fbSignUp, 
	signInWithEmailAndPassword as fbSignIn, 
	signInWithPopup as fbSignInWithPopup,
	signOut as fbSignOut
} from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { userConverter, userFirestoreConverter, UserModel } from "./models";
import { selectUser } from "./selectors";
import { resetTasks } from "../tasks/slice";

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

export enum Status {
	Success,
	Fail,
	UserExists,
	UserDoesntExist
}

export function signUp(email: string, password: string): Thunk<Promise<Status>> {
	return async dispatch => {
		try {
			const { user } = await fbSignUp(auth, email, password);
			dispatch(setCurrentUser(user.uid));

			return Status.Success;
		} catch (e:any) {
			if (e.code === "auth/email-already-in-use")
				return Status.UserExists;

			return Status.Fail;
		}
	};
}

export function signIn(email: string, password: string): Thunk<Promise<Status>> {
	return async dispatch => {
		try {
			const { user } = await fbSignIn(auth, email, password);
			dispatch(setCurrentUser(user.uid));

			return Status.Success;
		} catch (e:any) {
			if (e.code === "auth/user-not-found")
				return Status.UserDoesntExist;

			return Status.Fail;
		}
	};
}

export function signInWithGoogle(): Thunk<Promise<Status>> {
	return async dispatch => {
		try {
			const provider = new GoogleAuthProvider();
			const { user } = await fbSignInWithPopup(auth, provider);
			dispatch(setCurrentUser(user.uid));

			return Status.Success;
		} catch (e:any) {
			if (e.code === "auth/user-not-found")
				return Status.UserDoesntExist;

			return Status.Fail;
		}
	};
}

export function signOut(): Thunk<Promise<Status>> {
	return async dispatch => {
		try {
			await fbSignOut(auth);
			dispatch(setCurrentUser(null));
			dispatch(resetTasks());

			return Status.Success;
		} catch (e) {
			return Status.Fail;
		}
	};
}