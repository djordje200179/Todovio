import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
	className?: string;
	onSubmit: (email: string, password: string) => void;
	action: string;
}

export default function LoginForm({ onSubmit, className, action }: Props) {
	const [email, setEmail]       = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onSubmit(email, password);
	}

	return (
		<Form onSubmit={handleSubmit} className={className}>
			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Control className="mb-2" type="email"
				              placeholder="Enter email address"
				              value={email} onChange={e => setEmail(e.target.value)}/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control className="mb-2" type="password"
				              placeholder="Enter password"
				              value={password} onChange={e => setPassword(e.target.value)}/>
			</Form.Group>

			<Button type="submit" variant="primary">{action}</Button>
		</Form>
	);
}