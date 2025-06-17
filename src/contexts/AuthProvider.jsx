import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('User state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
      if(currentUser?.email){
        const userData = {email: currentUser.email}
        axios.post('http://localhost:5000/jwt', userData)
        .then(res=>{
          console.log('token after jwt',res.data)
        })
        .catch(error=>console.log(error))
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    userLogin,
    signInWithGoogle,
    userLogout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
