import { Card } from "react-bootstrap";
import styles from "./TaskView.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskModel } from "../../store/tasks/slice";
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import {selectTaskItems} from "../../store/tasks/selectors";
import classNames from "classnames";
import { useSelector } from "../../store/store";

interface Props {
	task: TaskModel;
}

export default function TaskView({ task }: Props) {
	const taskItems = useSelector(state => selectTaskItems(state, task.id));

	const [showItems, setShowItems] = useState(false);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	/*const groupName = task.isGroup ? useSelector(state => selectGroup(state, task.owner))?.name : null;

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
	);*/

	const cardTitle = <>
		{task.title}
	</>;

	return (
		<Card className={classNames("m-1", "bg-dark", styles.task)} as="article">
			<Card.Header className="text-white d-flex justify-content-between align-items-center"
			             onClick={() => setShowItems(prevState => !prevState)}>
				{cardTitle}

				<FontAwesomeIcon icon={showItems ? "arrow-up" : "arrow-down"}
				                 color="white" className={styles.arrowIcon}/>
			</Card.Header>

			<Card.Subtitle className="text-muted text-end mt-1 me-2">{new Date(task.edited_at).toLocaleDateString()}</Card.Subtitle>

			<Card.Body>
				{showItems && (
					<ul className={styles.itemList}>
						{taskItems?.map(item => <TaskItem item={item} key={item.item_id} />)}
					</ul>
				)}
			</Card.Body>
		</Card>
	);
}