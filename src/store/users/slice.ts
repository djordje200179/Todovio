import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Database } from "supabase/models";

export type UserModel = Database["public"]["Tables"]["users"]["Row"];
export type UsersMap = { [id: number]: UserModel };

interface UsersState {
	users: UsersMap;
	currentUserUuid: string | null;
	currentUserId: number | null;
}

const slice = createSlice({
	name: "user",
	initialState: {
		users: {},
		currentUserUuid: null,
		currentUserId: null
	} as UsersState,
	reducers: {
		resetUsers(state: UsersState) {
			state.users = {};
			state.currentUserId = null;
			state.currentUserUuid = null;
		},
		setUser(state: UsersState, action: PayloadAction<UserModel>) {
			state.users[action.payload.id] = action.payload;
		},
		setCurrentUserId(state: UsersState, action: PayloadAction<number | null>) {
			state.currentUserId = action.payload;
		},
		setCurrentUserUuid(state: UsersState, action: PayloadAction<string | null>) {
			state.currentUserUuid = action.payload;
		}
	}
});

export default slice.reducer;

export const { resetUsers, setUser, setCurrentUserId, setCurrentUserUuid } = slice.actions;