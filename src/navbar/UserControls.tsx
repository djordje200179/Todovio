import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../store/store";
import { selectCurrentUser } from "../store/users/selectors";
import { Button, Navbar } from "react-bootstrap";
import {useEffect} from "react";
import {auth} from "../firebase";
import { signOut } from "firebase/auth";
import { fetchCurrentUser } from "../store/users/thunks";

export default function UserControls() {
	const dispatch = useDispatch();

	useEffect(() => { dispatch(fetchCurrentUser()); }, [dispatch]);

	const user = useSelector(selectCurrentUser);

	return (
		<div>
			<Navbar.Text className="text-white mx-1">{user?.name}</Navbar.Text>

			<Link className="btn btn-outline-info mx-1" to="/settings">Settings</Link>
			<Button variant="outline-danger" onClick={async () => await signOut(auth)}
					className="mx-1">Sign out</Button>
		</div>
	);
}