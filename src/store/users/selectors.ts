import { RootState } from "../store";

export function selectUser(state: RootState, userId: number) {
	return state.users.users[userId];
}

export function selectCurrentUserId(state: RootState) {
	return state.users.currentUserId;
}

export function selectCurrentUserUuid(state: RootState) {
	return state.users.currentUserUuid;
}

export function selectIsUserLoggedIn(state: RootState) {
	return selectCurrentUserUuid(state) !== null;
}

export function selectCurrentUser(state: RootState) {
	const currentUserId = selectCurrentUserId(state);
	return currentUserId ? selectUser(state, currentUserId) : null;
};

export function selectCurrentUserGroupIds(state: RootState) {
	const currentUser = selectCurrentUser(state);
	return currentUser ? currentUser.groups : null;
}