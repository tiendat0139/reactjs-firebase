import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser?.email);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email..."
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={signIn}>
        Sign In
      </button>
      <button style={{ cursor: "pointer" }} onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <button style={{ cursor: "pointer" }} onClick={logout}>
        Sign out
      </button>
    </div>
  );
};

export default Auth;
