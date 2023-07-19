import {GroupsMap} from "./slice";
import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";
import {selectCurrentUserGroupIds} from "../users/selectors";

export const selectGroup = createSelector(
    [
        (state: RootState, groupId: number) => state.groups.groups,
        (state: RootState, groupId: number) => groupId
    ],
    (groups: GroupsMap, groupId: number) =>  groups[groupId]
);

export const selectCurrentUserGroups = (state: RootState) => 
    selectCurrentUserGroupIds(state)?.map(groupId => selectGroup(state, groupId));