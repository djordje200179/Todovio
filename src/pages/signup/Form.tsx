import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { Card } from "react-bootstrap";
import supabaseClient from "../../supabase/client";
import { AuthApiError } from "@supabase/supabase-js";

export default function Form() {
	const navigate = useNavigate();

	async function onSignUp(email: string, password: string) {
		const { data, error } = await supabaseClient.auth.signUp({
			email: email,
			password: password
		});

		if (data)
			navigate("/", { replace: true });
		else {
			if (error instanceof AuthApiError)
				console.log("User already exist");
		}
	}

	return (
		<Card bg="light" text="dark" className="mx-auto" style={{ width: 400 }}>
			<Card.Header>
				<h5>Create an account</h5>
			</Card.Header>
			<Card.Body>
				<LoginForm action="Sign up" onSubmit={onSignUp}/>
			</Card.Body>
		</Card>
	);
}