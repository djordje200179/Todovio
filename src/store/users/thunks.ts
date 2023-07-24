import { Thunk } from "../store";
import { setCurrentUserId, setUser } from "./slice";
import {selectCurrentUserId, selectCurrentUserUuid, selectUser} from "./selectors";
import supabaseClient from "../../supabase/client";

export function fetchUser(id: number, force?: boolean): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectUser(state, id);

		if(!force && oldData)
			return;

		const { data, error } = await supabaseClient.from("users").select("*").eq("id", id).single();

		if (error) {
			console.error(error);
			return;
		}

		dispatch(setUser(data));
	};
}

export function fetchCurrentUser(force?: boolean) : Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const uuid = selectCurrentUserUuid(state);
		
		if (!uuid) {
			console.error("No user logged in");
			return;
		}

		const id = selectCurrentUserId(state);
		if (id) {
			const oldData = selectUser(state, id);

			if(!force && oldData)
				return;
		}		

		const { data, error } = await supabaseClient.from("users").select("*").eq("uuid", uuid).single();

		if (error) {
			console.error(error);
			return;
		}

		dispatch(setUser(data));
		dispatch(setCurrentUserId(data.id));
	};
}