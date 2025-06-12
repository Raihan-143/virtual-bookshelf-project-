import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({children}) => {
     const [loading,setLoading]=useState(true)
      const [user,setUser]=useState(null)

      const createUser=(emai,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,emai,password)
    }
     //for user login
    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    // const signInWithGoogle=()=>{
    //     setLoading(true);
    //     return signInWithPopup(auth, googleProvider)
    // }

    //  logout
    const userLogout=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const authInfo={
         loading,
        user,
        createUser,
        userLogin,
        // signInWithGoogle,
        userLogout

    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
            console.log('user in the auth state change:', currentUser)
        //    if(currentUser?.email){
        //         const userData={ emai: currentUser. email}
        //         axios.post('http://localhost:5000/jwt',userData,{
        //             withCredentials:true
        //         })
        //         .then(res=>{
        //             console.log('Token after jwt',res.data)
        //         })
        //         .catch(error=>{
        //             console.log(error)
        //         })
        //     }
        //     console.log('User in the auth state change:',currentUser)
        })
        return ()=>{
            unSubscribe();
        }
    },[])
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;