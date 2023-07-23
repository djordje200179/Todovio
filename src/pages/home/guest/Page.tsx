import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabaseClient from "supabase/client";
import styles from "./Page.module.scss";
import classnames from "classnames";

export default function Page() {
	return (
		<section className={classnames("w-50", "mx-auto", styles.authSection)}>
			<Auth supabaseClient={supabaseClient} 
				  appearance={{
					theme: ThemeSupa,
					className: {
						button: "btn btn-outline-primary",
						input: "form-control",
					}
				  }}
				  providers={["google"]} />
		</section>
	);
}