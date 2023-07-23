import Sidebar from "./Sidebar";
import TaskList from "components/task/TaskList";

export default function Page() {
	return (
		<div>
			<Sidebar />
			<TaskList/>
		</div>
	);
}