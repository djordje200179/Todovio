import {createClient} from "@supabase/supabase-js";
import { Database } from "./models";

export default createClient<Database>(
	"https://oeygavnfqxdzhoifeuin.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9leWdhdm5mcXhkemhvaWZldWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NzAxNTEsImV4cCI6MjAwNTI0NjE1MX0.eCbJwh2FoklKyL0Tx_DG95HMxq-sudWProdiatigpzE"
);