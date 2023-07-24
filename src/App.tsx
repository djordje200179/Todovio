import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "navbar/Header";
import HomePage from "pages/home/HomePage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "store/store";
import { resetUsers, setCurrentUserUuid } from "store/users/slice";
import { resetGroups } from "store/groups/slice";
import { resetTasks } from "store/tasks/slice";
import supabaseClient from "supabase/client";
import { fetchAvailableTasks } from "store/tasks/thunks";
import { fetchCurrentUser } from "store/users/thunks";
import { fetchCurrentUserGroups } from "store/groups/thunks";

library.add(fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan);

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const callback = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			switch (event) {
			case "SIGNED_IN":
				dispatch(setCurrentUserUuid(session!.user.id));

				await dispatch(fetchCurrentUser());
				await dispatch(fetchAvailableTasks());
				await dispatch(fetchCurrentUserGroups());

				break;
			case "SIGNED_OUT":
				dispatch(resetGroups());
				dispatch(resetUsers());
				dispatch(resetTasks());
				
				break;
			}
		});

		return callback.data.subscription.unsubscribe;
	}, [dispatch]);

	return (
		<Fragment>
			<Header />

			<main className="flex-grow-1 bg-secondary">
				<Routes>
					<Route path="/" element={<HomePage/>}/>
				</Routes>
			</main>
		</Fragment>
	);
}