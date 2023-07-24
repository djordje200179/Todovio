import { createSlice } from "@reduxjs/toolkit";
import { Database } from "supabase/models";

export type GroupModel = Database["public"]["Tables"]["groups"]["Row"];
export type GroupsMap = { [id: string]: GroupModel };

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
        setGroup(state: GroupsState, action: { payload: GroupModel }) {
            state.groups[action.payload.id] = action.payload;
        }
    }
});

export default slice.reducer;

export const {resetGroups, setGroup} = slice.actions;