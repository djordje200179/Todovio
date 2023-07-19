import { Link, useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import { Fragment } from "react";
import supabaseClient from "../supabase/client";
import { AuthApiError } from "@supabase/supabase-js";

export default function AuthControls() {
	const navigate = useNavigate();

	async function onSignIn(email: string, password: string) {
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (data)
			navigate("/", { replace: true });
		else {
			if (error instanceof AuthApiError)
				console.log("User doesn't exist");
		}
	}

	async function onSignInWithGoogle() {
		// try {
		// 	const provider = new GoogleAuthProvider();
		// 	await signInWithPopup(auth, provider);

		// 	navigate("/", { replace: true });
		// } catch (e:any) {
		// 	if (e.code === "auth/user-not-found")
		// 		console.log("User doesn't exist");
		// }
	}

	const signInPopover = (
		<Popover id="popover-basic">
			<Popover.Body>
				<Fragment>
					<LoginForm action="Sign in" onSubmit={onSignIn}/>
					<Button variant="outline-primary" className="mx-1" onClick={onSignInWithGoogle}>Sign in with Google</Button>
				</Fragment>
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