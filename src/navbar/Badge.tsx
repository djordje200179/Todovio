import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "react-bootstrap";

export function Badge() {
	return (
		<Fragment>
			<FontAwesomeIcon icon="list-check" color="white" className="d-inline-block align-top"
			                 style={{ fontSize: 30 }}/>

			<Navbar.Text className="mx-2 text-white">Todovio</Navbar.Text>
		</Fragment>
	);
}