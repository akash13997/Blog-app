import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL6pA_sUDcqNvGmPlt_I9fvJUFx2dL3gA",
  authDomain: "blog-app-606bc.firebaseapp.com",
  projectId: "blog-app-606bc",
  storageBucket: "blog-app-606bc.appspot.com",
  messagingSenderId: "1022269239890",
  appId: "1:1022269239890:web:12bb39b66db1d7b3cba58b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
