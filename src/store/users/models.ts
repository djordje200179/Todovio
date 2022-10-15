import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface FirestoreUserModel {
	readonly name: string;
}

export interface ReduxUserModel {
	readonly uid: string;

	readonly name: string;
}

export interface UserModel {
	readonly uid: string;

	readonly name: string;
}

export function userConverter(reduxModel: ReduxUserModel): UserModel {
	return {
		...reduxModel
	};
}

export const userFirestoreConverter: FirestoreDataConverter<ReduxUserModel> = {
	toFirestore(user: ReduxUserModel): FirestoreUserModel {
		return {
			name: user.name
		};
	},
	fromFirestore(snap: QueryDocumentSnapshot<FirestoreUserModel>, options: SnapshotOptions): ReduxUserModel {
		const data = snap.data(options);

		return {
			uid: snap.id,

			name: data.name
		};
	}
};