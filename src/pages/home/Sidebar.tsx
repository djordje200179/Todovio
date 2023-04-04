import GroupList from "./GroupList";
import {Button} from "react-bootstrap";

export default function Sidebar() {
    return (
        <aside className="float-start bg-dark p-1 h-100" style={{width: 300}}>
            <h5 className="text-light">Groups</h5>
            <Button className="w-100 mb-1" variant="outline-info">Create new</Button>
            <GroupList/>
        </aside>
    );
}