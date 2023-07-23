import {RootState} from "../store";
import {selectCurrentUserGroupIds} from "../users/selectors";
import { memoize } from 'proxy-memoize';

export function selectGroup(state: RootState, groupId: number) {
	return state.groups.groups[groupId];
}

export const selectCurrentUserGroups = memoize(function (state: RootState) {
	const currentUserGroupIds = selectCurrentUserGroupIds(state);

	if (!currentUserGroupIds)
		return null;

	return currentUserGroupIds.map(groupId => selectGroup(state, groupId));
});