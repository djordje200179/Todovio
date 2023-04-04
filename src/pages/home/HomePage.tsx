import { Fragment } from "react";
import { useSelector } from "../../store/store";
import { selectIsUserLoggedIn } from "../../store/users/selectors";
import TaskList from "./TaskList";
import Index from "./Index";
import Sidebar from "./Sidebar";

export default function HomePage() {
	const loggedIn = useSelector(state => selectIsUserLoggedIn(state));

	const loggedInView = (
		<div>
			<Sidebar />
			<TaskList/>
		</div>
	);

	return (
		<Fragment>
			{loggedIn ? loggedInView : <Index />}
		</Fragment>
	);
}