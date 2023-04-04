import { Card, ListGroup } from "react-bootstrap";
import styles from "./TaskView.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskModel } from "../../store/tasks/models";
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import {useDispatch, useSelector} from "../../store/store";
import {selectGroup} from "../../store/groups/selectors";
import {changeTaskItemText, toggleTaskItem} from "../../store/tasks/slice";
import {updateTask} from "../../store/tasks/thunks";

interface Props {
	task: TaskModel;
}

export default function TaskView({ task }: Props) {
	const dispatch = useDispatch();

	const [showItems, setShowItems] = useState(false);

	function onChangeTaskItemCompleted(index: number, newState: boolean) {
		dispatch(toggleTaskItem(task.isGroup ? task.ownerUid : null, task.uid, index));
		dispatch(updateTask(task.isGroup ? task.ownerUid : null, task.uid));
	}

	function onChangeTaskItemText(index: number, newText: string) {
		dispatch(changeTaskItemText(task.isGroup ? task.ownerUid : null, task.uid, index, newText));
	}

	function onTaskItemTextChanged(index: number, newText: string) {
		dispatch(updateTask(task.isGroup ? task.ownerUid : null, task.uid));
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const groupName = task.isGroup ? useSelector(state => selectGroup(state, task.ownerUid))?.name : null;

	const cardTitle = task.isGroup ? (
		<span>
			{task.title}
			&nbsp;
			<i>[{groupName}]</i>
		</span>
	) : (
		<>
			{task.title}
		</>
	);

	return (
		<Card className="m-1 bg-dark" as="article">
			<Card.Header className="text-white d-flex justify-content-between align-items-center"
			             onClick={() => setShowItems(prevState => !prevState)}>
				{cardTitle}

				<FontAwesomeIcon icon={showItems ? "arrow-up" : "arrow-down"}
				                 color="white" className={styles.icon}/>
			</Card.Header>

			<Card.Subtitle className="text-muted text-end mt-1 me-2">{task.edited.toLocaleDateString()}</Card.Subtitle>

			<Card.Body>
				{showItems && (
					<ListGroup as="ul" variant="flush">
						{task.items.map((item, index) => (
							<TaskItem item={item}
							          key={index}
							          index={index}
							          onCompletedToggle={onChangeTaskItemCompleted}
							          onTextChanging={onChangeTaskItemText}
									  onTextChanged={onTaskItemTextChanged}/>
						))
						}
					</ListGroup>
				)}
			</Card.Body>
		</Card>
	);
}