import { GroupModel } from "store/groups/slice";
import { ListGroup } from "react-bootstrap";

interface Props {
    group: GroupModel;
}

export default function GroupView({ group }: Props) {
    return (
        <ListGroup.Item variant="dark" as="li">
            {group.name}
        </ListGroup.Item>
    );
}