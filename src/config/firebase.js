import { initializeApp } from "firebase/app";

/* Authentication with email and password */
import { getAuth } from "firebase/auth";

/* Authentication with google */
import { GoogleAuthProvider } from "firebase/auth";

/* Firestore */
import { getFirestore } from "firebase/firestore"

/* Storage */
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCUmeRa5LXNwc04dwSQIF_APMrzl0kiFTs",
  authDomain: "reactjs-firebase-f1f9e.firebaseapp.com",
  projectId: "reactjs-firebase-f1f9e",
  storageBucket: "reactjs-firebase-f1f9e.appspot.com",
  messagingSenderId: "573501648187",
  appId: "1:573501648187:web:043f9996ae1492ab9f1b1e",
  measurementId: "G-Q00X94NGYB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const db = getFirestore(app)

const storage = getStorage(app)

export { auth, googleProvider, db, storage };
