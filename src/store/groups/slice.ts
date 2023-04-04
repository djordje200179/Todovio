import {ReduxGroupModel} from "./models";
import {createSlice} from "@reduxjs/toolkit";

export type GroupsMap = { [gid: string]: ReduxGroupModel };

interface GroupsState {
    groups: GroupsMap;
}

const slice = createSlice({
    name: "group",
    initialState: {
        groups: {}
    } as GroupsState,
    reducers: {
        resetGroups(state: GroupsState) {
            state.groups = {};
        },
        setGroup(state: GroupsState, action: { payload: ReduxGroupModel }) {
            state.groups[action.payload.uid] = action.payload;
        }
    }
});

export default slice.reducer;

export const {resetGroups, setGroup} = slice.actions;