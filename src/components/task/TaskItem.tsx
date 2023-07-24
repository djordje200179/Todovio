import { TaskItemModel } from "store/tasks/slice";
import { Form, InputGroup } from "react-bootstrap";
import { ChangeEvent } from "react";
import { useDispatch } from "store/store";
import { changeTaskItemText, changeTaskItemCompleted } from "store/tasks/slice";
import { updateTaskItem } from "store/tasks/thunks";

interface Props {
	item: TaskItemModel;
}

export function TaskItem({ item }: Props) {
	const dispatch = useDispatch();

	async function onCompletedChanged(newState: boolean) {
		dispatch(changeTaskItemCompleted(item.task_id, item.item_id, newState));
		await dispatch(updateTaskItem(item));
	}

	function onTextChanging(newText: string) {
		dispatch(changeTaskItemText(item.task_id, item.item_id, newText));
	}

	async function onTextChanged(newText: string) {
		dispatch(changeTaskItemText(item.task_id, item.item_id, newText));
		await dispatch(updateTaskItem(item));
	}

	return (
		<li className="px-0 pt-1">
			<InputGroup>
				<InputGroup.Checkbox value={item.completed}
				                     onChange={(event: ChangeEvent<HTMLInputElement>) => onCompletedChanged(event.target.checked)} />
				<Form.Control value={item.text}
							  onBlur={event => onTextChanged(event.target.value)}
				              onChange={event => onTextChanging(event.target.value)} />
			</InputGroup>
		</li>

	);
}