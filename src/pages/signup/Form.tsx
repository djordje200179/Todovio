import { useDispatch } from "../../store/store";
import { Status, signUp } from "../../store/users/thunks";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { Card } from "react-bootstrap";

export default function Form() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function onSignUp(email: string, password: string) {
		const status = await dispatch(signUp(email, password));

		switch (status) {
			case Status.Success:
				navigate("/", { replace: true });
				break;
			case Status.UserExists:
				console.log("User exists");
				break;
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