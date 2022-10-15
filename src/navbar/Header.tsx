import { useSelector } from "../store/store";
import { selectIsUserLoggedIn } from "../store/users/selectors";
import { Badge } from "./Badge";
import AuthControls from "./AuthControls";
import UserControls from "./UserControls";
import { Navbar } from "react-bootstrap";

export default function Header() {
	const loggedIn = useSelector(state => selectIsUserLoggedIn(state));

	// TODO: Change Navbar.Brand to Link
	return (
		<Navbar bg="dark" expand="false" className="px-3">
			<Navbar.Brand href="/">
				<Badge/>
			</Navbar.Brand>

			{loggedIn ? <UserControls/> : <AuthControls/>}
		</Navbar>
	);
}