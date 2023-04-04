import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { Card } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Form() {
	const navigate = useNavigate();

	async function onSignUp(email: string, password: string) {
		try {
			await createUserWithEmailAndPassword(auth, email, password);

			navigate("/", { replace: true });
		} catch(e: any) {
			if (e.code === "auth/email-already-in-use")
				console.log("User exists");
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