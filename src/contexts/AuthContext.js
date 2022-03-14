import React, { useEffect, createContext, useContext, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  function addScore(score) {
    const scoreRef = doc(db, 'users', auth.currentUser.uid);
    return setDoc(scoreRef, {
      score: score
    });
  }

  async function getScores() {
    const scoresRef = doc(db, 'users', auth.currentUser.uid);
    const scores = await getDoc(scoresRef);

    if(scores.exists()) {
      return scores.data();
    }
    return "";
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    addScore,
    getScores,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}