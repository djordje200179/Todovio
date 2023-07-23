import GroupList from "components/group/GroupList";
import { Button } from "react-bootstrap";
import styles from "./Sidebar.module.scss";
import classNames from "classnames";

export default function Sidebar() {
    return (
        <aside className={classNames("float-start", "bg-dark", "p-1", "h-100", styles.sidebar)}>
            <h5 className="text-light">Groups</h5>
            <Button className="w-100 mb-1" variant="outline-info">Create new</Button>
            <GroupList/>
        </aside>
    );
}