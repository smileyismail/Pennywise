import React, { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../config/firebase";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signUp(fullName, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: fullName });
  }

  async function logIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut() {
    await signOut(auth);
  }

  async function forgotPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function googleAuth() {
    const googleAuthProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuthProvider);
  }

  const value = { user, signUp, logIn, logOut, forgotPassword, googleAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
