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
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {resetUsers, setCurrentUserUid} from "./store/users/slice";
import {resetGroups} from "./store/groups/slice";
import {resetTasks} from "./store/tasks/slice";

library.add(fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan);

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user)
				dispatch(setCurrentUserUid(user.uid));
			else {
				dispatch(setCurrentUserUid(null));

				dispatch(resetGroups());
				dispatch(resetUsers());
				dispatch(resetTasks());
			}
		});
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