import { Card } from "react-bootstrap";
import styles from "./TaskView.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskModel } from "../../store/tasks/models";
import { useState } from "react";
import { TaskItem } from "./TaskItem";

interface Props {
	task: TaskModel;
}

export default function TaskView({ task }: Props) {
	const [showItems, setShowItems] = useState(false);

	function onChangeTaskItemCompleted(index: number, newState: boolean) {

	}

	function onChangeTaskItemText(index: number, newText: string) {

	}

	return (
		<Card className="m-1 bg-dark" as="article">
			<Card.Header className="text-white d-flex justify-content-between align-items-center"
			             onClick={() => setShowItems(prevState => !prevState)}>
				{task.title}

				<FontAwesomeIcon icon={showItems ? "arrow-up" : "arrow-down"}
				                 color="white" className={styles.icon}/>
			</Card.Header>

			<Card.Subtitle className="text-muted text-end mt-1 me-2">{task.edited.toLocaleDateString()}</Card.Subtitle>

			<Card.Body>
				{showItems && (
					<ul className="list-group list-group-flush">
						{task.items.map((item, index) => (
							<TaskItem item={item}
							          key={index}
							          index={index}
							          onCompletedToggle={onChangeTaskItemCompleted}
							          onTextChange={onChangeTaskItemText}/>
						))
						}
					</ul>
				)}
			</Card.Body>
		</Card>
	);
}