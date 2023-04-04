import {FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from "firebase/firestore";

export interface FirestoreGroupModel {
    readonly name: string;
    readonly members: string[];
    readonly owner: string;
}

export interface ReduxGroupModel {
    readonly uid: string;

    readonly name: string;
    readonly memberUids: string[];
    readonly ownerUid: string;
}

export interface GroupModel {
    readonly uid: string;

    readonly name: string;
    readonly memberUids: string[];
    readonly ownerUid: string;
}

export function groupConverter(reduxModel: ReduxGroupModel): GroupModel {
    return {
        ...reduxModel
    };
}

export const groupFirestoreConverter: FirestoreDataConverter<ReduxGroupModel> = {
    toFirestore(group: ReduxGroupModel): FirestoreGroupModel {
        return {
            name: group.name,
            members: group.memberUids,
            owner: group.ownerUid
        };
    },
    fromFirestore(snap: QueryDocumentSnapshot<FirestoreGroupModel>, options: SnapshotOptions): ReduxGroupModel {
        const data = snap.data(options);

        return {
            uid: snap.id,

            name: data.name,
            memberUids: data.members,
            ownerUid: data.owner
        };
    }
}