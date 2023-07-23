import { FormEvent, useState } from "react";
import { useDispatch } from "../store/store";
import { createNewTask } from "../store/tasks/thunks";
import { Button, Form } from "react-bootstrap";

export default function TaskForm() {
	const [text, setText] = useState("");

	const dispatch = useDispatch();

	function onAdd(e: FormEvent) {
		e.preventDefault();
		dispatch(createNewTask(text));
	}

	return (
		<Form onSubmit={onAdd}>
			<Form.Group>
				<Form.Label>Text</Form.Label>
				<Form.Control type="text" placeholder="Task text"
				              value={text} onChange={e => setText(e.target.value)}/>
			</Form.Group>

			<Button type="submit" variant="primary">Add</Button>
		</Form>
	);
}