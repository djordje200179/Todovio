import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
	apiKey: "AIzaSyCgRXjikVKw1AXfJNT-mKX0W8WQVEJQIeY",
	authDomain: "todovio-e555e.firebaseapp.com",
	projectId: "todovio-e555e",
	storageBucket: "todovio-e555e.appspot.com",
	messagingSenderId: "517209781948",
	appId: "1:517209781948:web:69e5095c2329842f0002b9",
	measurementId: "G-G0PJZZZB2Q"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth      = getAuth(app);
export const firestore = getFirestore(app);