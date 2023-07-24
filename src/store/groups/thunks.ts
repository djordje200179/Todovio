import {Thunk} from "../store";
import {selectGroup} from "./selectors";
import {GroupModel, setGroup} from "./slice";
import supabaseClient from "../../supabase/client";
import { selectCurrentUserGroupIds } from "../users/selectors";

export function fetchGroup(id: number, force?: boolean): Thunk {
	return async (dispatch, getState) => {
		const state = getState();
		const oldData = selectGroup(state, id);

		if(!force && oldData)
			return oldData;

		const { data, error } = await supabaseClient.from("groups").select("*").eq("id", id).single();

		if (error) {
			console.error(error);
			return null;
		}

		dispatch(setGroup(data));

		return data;
	};
}

export function fetchCurrentUserGroups(): Thunk {
	return async (dispatch, getState) => {
		const state = getState();
		const userGroupIds = selectCurrentUserGroupIds(state);

		if (!userGroupIds)
			return null;

		const { data, error } = await supabaseClient.from("groups").select("*").in("id", userGroupIds);

		if (error) {
			console.error(error);
			return null;
		}

		data.forEach(group => dispatch(setGroup(group)));
		
		return data;
	};
}

export function createNewGroup(name: string): Thunk {
	return async (dispatch, getState) => {
		const { data, error } = await supabaseClient.rpc("create_new_group", { group_name: name });

		if (error) {
			console.error(error);
			return;
		}

		dispatch(fetchGroup(data));
	};
}