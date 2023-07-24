import { Link } from "react-router-dom";
import { useSelector } from "store/store";
import { selectCurrentUser } from "store/users/selectors";
import { Button, Navbar } from "react-bootstrap";
import supabaseClient from "supabase/client";

export default function UserControls() {
	const user = useSelector(selectCurrentUser);

	return (
		<div>
			<Navbar.Text className="text-white mx-1">{user?.name}</Navbar.Text>

			<Link className="btn btn-outline-info mx-1" to="/settings">Settings</Link>
			<Button variant="outline-danger" onClick={async () => await supabaseClient.auth.signOut()}
					className="mx-1">Sign out</Button>
		</div>
	);
}