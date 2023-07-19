import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UsersMap } from "./slice";

export const selectUser = createSelector(
	[
		(state: RootState, userId: number) => state.users.users,
		(state: RootState, userId: number) => userId
	],
	(users: UsersMap, userId: number) => users[userId]
);

export const selectCurrentUserId = (state: RootState) => state.users.currentUserId;

export const selectCurrentUserUuid = (state: RootState) => state.users.currentUserUuid;

export const selectIsUserLoggedIn = (state: RootState) => selectCurrentUserUuid(state) !== null;

export const selectCurrentUser = (state: RootState) => {
	const currentUserId = selectCurrentUserId(state);
	return currentUserId ? selectUser(state, currentUserId) : null;
};

export const selectCurrentUserGroupIds = (state: RootState) => 
	selectCurrentUser(state)?.groups;