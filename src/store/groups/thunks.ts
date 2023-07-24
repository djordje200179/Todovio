import { Thunk } from "../store";
import { selectGroup } from "./selectors";
import { setGroup } from "./slice";
import supabaseClient from "supabase/client";
import { selectCurrentUserGroupIds } from "../users/selectors";

export function fetchGroup(id: number, force?: boolean): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectGroup(state, id);

		if(!force && oldData)
			return;

		const { data, error } = await supabaseClient.from("groups").select("*").eq("id", id).single();

		if (error) {
			console.error(error);
			return;
		}

		dispatch(setGroup(data));
	};
}

export function fetchCurrentUserGroups(): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const userGroupIds = selectCurrentUserGroupIds(state);

		if (!userGroupIds)
			return;

		const { data, error } = await supabaseClient.from("groups").select("*").in("id", userGroupIds);

		if (error) {
			console.error(error);
			return;
		}

		data.forEach(group => dispatch(setGroup(group)));
	};
}

export function createNewGroup(name: string): Thunk<Promise<void>> {
	return async (dispatch, getState) => {
		const { data, error } = await supabaseClient.rpc("create_new_group", { group_name: name });

		if (error) {
			console.error(error);
			return;
		}

		dispatch(fetchGroup(data));
	};
}