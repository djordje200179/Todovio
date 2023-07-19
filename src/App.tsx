import {Fragment, useEffect} from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, 
	faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import Header from "./navbar/Header";
import {useDispatch} from "./store/store";
import {resetUsers, setCurrentUserUuid} from "./store/users/slice";
import {resetGroups} from "./store/groups/slice";
import {resetTasks} from "./store/tasks/slice";
import supabaseClient from "./supabase/client";

library.add(fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan);

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const callback = supabaseClient.auth.onAuthStateChange((event, session) => {
			switch (event) {
			case "SIGNED_IN":
				dispatch(setCurrentUserUuid(session!.user.id));
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

			<Routes>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/signup" element={<SignUpPage/>}/>
			</Routes>
		</Fragment>
	);
}