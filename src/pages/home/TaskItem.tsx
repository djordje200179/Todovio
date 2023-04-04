import { TaskItemModel } from "../../store/tasks/models";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { ChangeEvent } from "react";

interface Props {
	item: TaskItemModel;
	index: number;

	onCompletedChanged: (index: number, newState: boolean) => void;
	onTextChanging: (index: number, newText: string) => void;
	onTextChanged: (index: number, newText: string) => void;
}

export function TaskItem({ item, index, onCompletedChanged, onTextChanging, onTextChanged }: Props) {
	return (
		<ListGroup.Item as="li" variant="dark">
			<InputGroup>
				<InputGroup.Checkbox value={item.completed}
				                     onChange={(event: ChangeEvent<HTMLInputElement>) => onCompletedChanged(index, event.target.checked)}/>
				<Form.Control value={item.text}
							  onBlur={event => onTextChanged(index, event.target.value)}
				              onChange={event => onTextChanging(index, event.target.value)}/>
			</InputGroup>
		</ListGroup.Item>

	);
}