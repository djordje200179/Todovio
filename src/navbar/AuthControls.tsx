import { Link, useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "../store/store";
import { Status, signIn } from "../store/users/thunks";

export default function AuthControls() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function onSignIn(email: string, password: string) {
		const status = await dispatch(signIn(email, password));

		switch (status) {
			case Status.Success:
				navigate("/", { replace: true });
				break;
			case Status.UserDoesntExist:
				console.log("User doesn't exist");
				break;
		}
	}

	const signInPopover = (
		<Popover id="popover-basic">
			<Popover.Body>
				<LoginForm action="Sign in" onSubmit={onSignIn}/>
			</Popover.Body>
		</Popover>
	);

	// TODO: Change Link to Button
	return (
		<div>
			<Link className="btn btn-outline-primary mx-1" to="/signup">
				Sign up
			</Link>

			<OverlayTrigger trigger="click" placement="bottom" overlay={signInPopover}>
				<Button variant="outline-primary" className="mx-1">Sign in</Button>
			</OverlayTrigger>
		</div>
	);
}