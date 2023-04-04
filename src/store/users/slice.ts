import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUserModel } from "./models";

export type UsersMap = { [uid: string]: ReduxUserModel };

interface UsersState {
	users: UsersMap;
	currentUserUid: string | null;
}

const slice = createSlice({
	name: "user",
	initialState: {
		users: {},
		currentUserUid: null
	} as UsersState,
	reducers: {
		resetUsers(state: UsersState) {
			state.users = {};
		},
		setUser(state: UsersState, action: PayloadAction<ReduxUserModel>) {
			state.users[action.payload.uid] = action.payload;
		},
		setCurrentUserUid(state: UsersState, action: PayloadAction<string | null>) {
			state.currentUserUid = action.payload;
		}
	}
});

export default slice.reducer;

export const { resetUsers, setUser, setCurrentUserUid } = slice.actions;