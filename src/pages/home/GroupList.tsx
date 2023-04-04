import {useDispatch, useSelector} from "../../store/store";
import {useEffect} from "react";
import {selectCurrentUserGroups} from "../../store/groups/selectors";
import {fetchCurrentUserGroups} from "../../store/groups/thunks";
import {selectCurrentUser} from "../../store/users/selectors";
import GroupView from "./GroupView";
import {ListGroup} from "react-bootstrap";

export default function GroupList() {
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchCurrentUserGroups()); }, [dispatch, currentUser]);

    const groups = useSelector(selectCurrentUserGroups);

    return (
        <ListGroup as="aside" className="float-start bg-dark" style={{width: 300}}>
            {groups?.map(group =>
                group ? <GroupView key={group.uid} group={group}/> : null
            )}
        </ListGroup>
    );
}