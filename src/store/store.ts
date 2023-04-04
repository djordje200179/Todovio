import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import UsersReducer from "./users/slice";
import TasksReducer from "./tasks/slice";
import GroupsReducer from "./groups/slice";

const store = configureStore({
	reducer: {
		users: UsersReducer,
		tasks: TasksReducer,
		groups: GroupsReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export const useDispatch: () => AppDispatch               = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;