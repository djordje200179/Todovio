import { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Header from "./navbar/Header";

library.add(fas, faListCheck, faAngleDown, faEnvelope, faKey, faTrashCan);

export default function App() {
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