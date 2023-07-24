import { Thunk } from "../store";
import { setCurrentUserId, setUser } from "./slice";
import { selectCurrentUserUuid } from "./selectors";
import supabaseClient from "supabase/client";

export function fetchUser(id: number): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const { data, error } = await supabaseClient.from("users").select("*").eq("id", id).single();

		if (error) {
			console.error(error);
			return;
		}

		dispatch(setUser(data));
	};
}

export function fetchCurrentUser() : Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const uuid = selectCurrentUserUuid(state);
		
		if (!uuid) {
			console.error("No user logged in");
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