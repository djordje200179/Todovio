import { Fragment } from "react";
import Sidebar from "./Sidebar";
import TaskList from "components/task/TaskList";

export default function Page() {
	return (
		<Fragment>
			<Sidebar />
			<TaskList/>
		</Fragment>
	);
}