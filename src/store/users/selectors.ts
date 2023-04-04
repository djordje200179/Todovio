import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userConverter } from "./models";
import { UsersMap } from "./slice";

export const selectUser = createSelector(
	[
		(state: RootState, userUid: string) => state.users.users,
		(state: RootState, userUid: string) => userUid
	],
	(users: UsersMap, userUid: string) => {
		const reduxModel = users[userUid];
		return reduxModel ? userConverter(reduxModel) : null;
	}
);

export const selectCurrentUserUid = (state: RootState) => state.users.currentUserUid;

export const selectIsUserLoggedIn = (state: RootState) => selectCurrentUserUid(state) !== null;

export const selectCurrentUser = (state: RootState) => {
	const currentUserUid = selectCurrentUserUid(state);
	return currentUserUid ? selectUser(state, currentUserUid) : null;
};

export const selectCurrentUserGroupUids = (state: RootState) => {
	const currentUser = selectCurrentUser(state);
	return currentUser?.groupUids;
}