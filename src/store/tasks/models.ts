import {
	serverTimestamp,
	FirestoreDataConverter, SnapshotOptions,
	QueryDocumentSnapshot, Timestamp, FieldValue
} from "firebase/firestore";

export interface TaskItemModel {
	completed: boolean;
	text: string;
}

export interface FirestoreTaskModel {
	readonly created: Timestamp | FieldValue;
	readonly edited: Timestamp | FieldValue;

	readonly title: string;
	readonly items: TaskItemModel[];
}

export interface ReduxTaskModel {
	readonly uid: string;
	readonly ownerUid: string;
	readonly isGroup: boolean;

	readonly creationTime: number;
	editTime: number;

	readonly title: string;
	readonly items: TaskItemModel[];

	isEdited: boolean;
}

export interface TaskModel {
	readonly uid: string;
	readonly ownerUid: string;
	readonly isGroup: boolean;

	readonly created: Date;
	readonly edited: Date;

	readonly title: string;
	readonly items: TaskItemModel[];
}

export function taskConverter(reduxModel: ReduxTaskModel): TaskModel {
	return {
		...reduxModel,

		created: new Date(reduxModel.creationTime),
		edited: new Date(reduxModel.editTime)
	};
}

export const taskFirestoreConverter: FirestoreDataConverter<ReduxTaskModel> = {
	toFirestore(task: ReduxTaskModel): FirestoreTaskModel {
		return {
			created: Timestamp.fromMillis(task.creationTime),
			edited: task.isEdited ? serverTimestamp() : Timestamp.fromMillis(task.editTime),

			title: task.title,
			items: task.items
		};
	},
	fromFirestore(snap: QueryDocumentSnapshot<FirestoreTaskModel>, options: SnapshotOptions): ReduxTaskModel {
		const data = snap.data(options);

		const ownerUid = snap.ref.parent.parent!.id;
		const creationTime = (data.created as Timestamp).toMillis();
		const editTime = (data.edited as Timestamp).toMillis();
		const isGroup = snap.ref.parent.parent!.parent.id === "groups";

		return {
			uid: snap.id,
			ownerUid,
			isGroup,

			creationTime,
			editTime,

			title: data.title,
			items: data.items,

			isEdited: false
		};
	}
};