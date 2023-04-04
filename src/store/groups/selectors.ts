import {GroupsMap} from "./slice";
import {RootState} from "../store";
import {groupConverter} from "./models";
import {createSelector} from "@reduxjs/toolkit";
import {selectCurrentUserGroupUids} from "../users/selectors";

export const selectGroup = createSelector(
    [
        (state: RootState, groupUid: string) => state.groups.groups,
        (state: RootState, groupUid: string) => groupUid
    ],
    (groups: GroupsMap, groupUid: string) => {
        const reduxModel = groups[groupUid];
        return reduxModel ? groupConverter(reduxModel) : null;
    }
);

export const selectCurrentUserGroups = (state: RootState) => {
    const currentUserGroupUids = selectCurrentUserGroupUids(state);
    return currentUserGroupUids?.map(groupUid => selectGroup(state, groupUid));
}