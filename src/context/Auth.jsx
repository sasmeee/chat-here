import { createContext, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const userDocRef = doc(db, "users", result.user.uid);
    await setDoc(userDocRef, {
      email: result.user.email,
      name: result.user.displayName,
      token: result.user.refreshToken,
      pp: result.user.photoURL,
    });

    cookies.set("auth-token", result.user.refreshToken);
  };

  const logOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
  };

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
