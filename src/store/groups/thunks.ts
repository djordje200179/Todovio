import {Thunk} from "../store";
import {groupConverter, groupFirestoreConverter, GroupModel} from "./models";
import {selectGroup} from "./selectors";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {setGroup} from "./slice";
import {selectCurrentUserGroupUids} from "../users/selectors";

export function fetchGroup(uid: string, force?: boolean): Thunk<Promise<GroupModel | null>> {
    return async (dispatch, getState) => {
        const state = getState();
        const oldData = selectGroup(state, uid);

        if(!force && oldData)
            return oldData;

        const ref = doc(firestore, "groups", uid).withConverter(groupFirestoreConverter);
        const snap = await getDoc(ref);

        if (!snap.exists())
            return null;

        const group = snap.data();
        dispatch(setGroup(group));

        return groupConverter(group);
    };
}

export function fetchCurrentUserGroups(force?: boolean): Thunk<Promise<(GroupModel|null)[] | null>> {
    return async (dispatch, getState) => {
        const state = getState();
        const userGroupUids = selectCurrentUserGroupUids(state);

        if (!userGroupUids)
            return null;

        return await Promise.all(userGroupUids.map(uid => dispatch(fetchGroup(uid, force))));
    };
}