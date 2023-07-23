import {useDispatch, useSelector} from "../../store/store";
import {useEffect} from "react";
import {selectCurrentUserGroups} from "../../store/groups/selectors";
import {fetchCurrentUserGroups} from "../../store/groups/thunks";
import GroupView from "./GroupView";
import {ListGroup} from "react-bootstrap";

export default function GroupList() {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchCurrentUserGroups()); }, [dispatch]);

    const groups = useSelector(selectCurrentUserGroups);

    return (
        <ListGroup as="ul">
            {groups?.map(group =>
                group ? <GroupView key={group.id} group={group}/> : null
            )}
        </ListGroup>
    );
}