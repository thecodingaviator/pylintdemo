/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, {
  useEffect, createContext, useContext, useState,
} from 'react';
import {
  doc, setDoc, getDoc, getDocs, collection,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUID, setCurrentUID] = useState(null);

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

  async function getScores(userID) {
    const scoresRef = doc(db, 'users', userID || auth.currentUser.uid);
    const scores = await getDoc(scoresRef);

    if (scores.exists()) {
      return scores.data();
    }
    return '';
  }

  function addScore(score) {
    const scoreRef = doc(db, 'users', auth.currentUser.uid);
    return setDoc(scoreRef, {
      score,
    });
  }

  async function getErrorMarkdown(errorCode) {
    const mdRef = doc(db, 'errors', errorCode || auth.currentUser.uid);
    const markdown = await getDoc(mdRef);

    if (markdown.exists()) {
      return markdown.data();
    }
    return false;
  }

  async function getAdmins() {
    const adminsRef = doc(db, 'admins', 'admins');
    const admins = await getDoc(adminsRef);

    if (admins.exists()) {
      return admins.data();
    }
    return false;
  }

  function addErrorMarkdown(errorCode, markdown) {
    const mdRef = doc(db, 'errors', errorCode);
    return setDoc(mdRef, {
      md: markdown,
    });
  }

  async function getAllErrors() {
    const querySnapshot = await getDocs(collection(db, 'errors'));
    const errors = [];
    querySnapshot.forEach((error) => {
      errors.push(
        {
          id: error.id,
          ...error.data(),
        },
      );
    });
    return errors;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCurrentUID(user ? user.uid : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUID,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    addScore,
    getScores,
    getErrorMarkdown,
    addErrorMarkdown,
    getAdmins,
    getAllErrors,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
