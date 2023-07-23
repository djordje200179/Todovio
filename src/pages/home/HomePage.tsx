import { Fragment } from "react";
import { useSelector } from "store/store";
import { selectIsUserLoggedIn } from "store/users/selectors";
import GuestPage from "./guest/Page";
import UserPage from "./user/Page";

export default function HomePage() {
	const loggedIn = useSelector(selectIsUserLoggedIn);

	return (
		<Fragment>
			{loggedIn ? <UserPage /> : <GuestPage />}
		</Fragment>
	);
}