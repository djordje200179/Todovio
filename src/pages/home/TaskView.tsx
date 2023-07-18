import { Card } from "react-bootstrap";
import styles from "./TaskView.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskModel } from "../../store/tasks/models";
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import {useDispatch, useSelector} from "../../store/store";
import {selectGroup} from "../../store/groups/selectors";
import {changeTaskItemText, changeTaskItemCompleted} from "../../store/tasks/slice";
import {updateTask} from "../../store/tasks/thunks";
import classNames from "classnames";

interface Props {
	task: TaskModel;
}

export default function TaskView({ task }: Props) {
	const dispatch = useDispatch();

	const [showItems, setShowItems] = useState(false);

	function onTaskItemCompletedChanged(index: number, newState: boolean) {
		dispatch(changeTaskItemCompleted(task.isGroup ? task.ownerUid : null, task.uid, index, newState));
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
		<Card className={classNames("m-1", "bg-dark", styles.task)} as="article">
			<Card.Header className="text-white d-flex justify-content-between align-items-center"
			             onClick={() => setShowItems(prevState => !prevState)}>
				{cardTitle}

				<FontAwesomeIcon icon={showItems ? "arrow-up" : "arrow-down"}
				                 color="white" className={styles.arrowIcon}/>
			</Card.Header>

			<Card.Subtitle className="text-muted text-end mt-1 me-2">{task.edited.toLocaleDateString()}</Card.Subtitle>

			<Card.Body>
				{showItems && (
					<ul className={styles.itemList}>
						{task.items.map((item, index) => (
							<TaskItem item={item}
							          key={index}
							          index={index}
							          onCompletedChanged={onTaskItemCompletedChanged}
							          onTextChanging={onChangeTaskItemText}
									  onTextChanged={onTaskItemTextChanged}/>
						))
						}
					</ul>
				)}
			</Card.Body>
		</Card>
	);
}