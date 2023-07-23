import { useSelector } from "store/store";
import { selectIsUserLoggedIn } from "store/users/selectors";
import { Badge } from "./Badge";
import UserControls from "./user/Controls";
import { Navbar } from "react-bootstrap";

export default function Header() {
	const loggedIn = useSelector(selectIsUserLoggedIn);

	// TODO: Change Navbar.Brand to Link
	return (
		<Navbar bg="dark" expand="false" className="px-3">
			<Navbar.Brand href="/">
				<Badge/>
			</Navbar.Brand>

			{ loggedIn && <UserControls/> }
		</Navbar>
	);
}