import { TaskItemModel } from "../../store/tasks/models";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { ChangeEvent } from "react";

interface Props {
	item: TaskItemModel;
	index: number;

	onCompletedToggle: (index: number, newState: boolean) => void;
	onTextChange: (index: number, newText: string) => void;
}

export function TaskItem({ item, index, onCompletedToggle, onTextChange }: Props) {
	return (
		<ListGroup.Item as="li" variant="dark">
			<InputGroup>
				<InputGroup.Checkbox value={item.completed}
				                     onChange={(event: ChangeEvent<HTMLInputElement>) => onCompletedToggle(index, event.target.checked)}/>
				<Form.Control value={item.text}
				              onChange={event => onTextChange(index, event.target.value)}/>
			</InputGroup>
		</ListGroup.Item>

	);
}