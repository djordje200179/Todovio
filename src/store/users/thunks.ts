import { Thunk } from "../store";
import { UserModel, setCurrentUserId, setUser } from "./slice";
import {selectCurrentUserId, selectCurrentUserUuid, selectUser} from "./selectors";
import supabaseClient from "../../supabase/client";

export function fetchUser(id: number, force?: boolean): Thunk<Promise<UserModel | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectUser(state, id);

		if(!force && oldData)
			return oldData;

		const { data, error } = await supabaseClient.from("users").select("*").eq("id", id).single();

		if (error) {
			console.error(error);
			return null;
		}

		dispatch(setUser(data));

		return data;
	};
}

export function fetchCurrentUser(force?:boolean) : Thunk<Promise<UserModel | null>> {
	return async (dispatch, getState) => {
		const state = getState();
		const uuid = selectCurrentUserUuid(state);
		if (!uuid) {
			console.error("No user logged in");
			return null;
		}

		const id = selectCurrentUserId(state);
		if (id) {
			const oldData = selectUser(state, id);

			if(!force && oldData)
				return oldData;
		}		

		const { data, error } = await supabaseClient.from("users").select("*").eq("uuid", uuid).single();

		if (error) {
			console.error(error);
			return null;
		}

		dispatch(setUser(data));
		dispatch(setCurrentUserId(data.id));

		return data;
	};
}