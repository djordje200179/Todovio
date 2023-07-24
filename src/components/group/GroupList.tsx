import { useSelector } from "store/store";
import { selectCurrentUserGroups } from "store/groups/selectors";
import GroupView from "./GroupView";
import { ListGroup } from "react-bootstrap";

export default function GroupList() {
    const groups = useSelector(selectCurrentUserGroups);

    return (
        <ListGroup as="ul" className="h-100">
            {groups?.map(group =>
                group && <GroupView key={group.id} group={group}/>
            )}
        </ListGroup>
    );
}