import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // googleSignIn
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // createUser
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // updateUserProfile
    const updateUserProfile = (user, fullname) => {
        setLoading(true);
        return updateProfile(user, {
            displayName: fullname
        });
    };

    // verifyEmail
    const verifyEmail = user => {
        setLoading(true);
        return sendEmailVerification(user);
    }

    // signInUser
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // forgotPassword
    const forgotPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    // logOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // deleteAccount
    const deleteAccount = user => {
        setLoading(true);
        return deleteUser(auth, user);
    }


    // onAuthStateChanged
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if(currentUser?.email){
                const userInfo = { email: currentUser.email };
                const fetchData = async() => {
                    try{
                        const res = await axiosPublic.post('/createToken', userInfo);
                        // console.log("response from createToken:", res.data);
                        setLoading(false);
                    }catch(err){
                        console.error(err);
                    }
                };
                fetchData();
            }else{
                const fetchData = async() => {
                    try{
                        const res = await axiosPublic.post('/logout', {});
                        const data = await res.data;
                        // console.log("response from logout:", data);
                        setLoading(false);
                    }catch(err){
                        console.error(err);
                    }
                };
                fetchData();
            }

            console.log("Current user:", currentUser);
        });

        return () => {
            return unsubscribe();
        }
    }, [setUser, setLoading]);


    const userInfo = {
        user, setUser,
        loading, setLoading,
        googleSignIn,
        createUser,
        updateUserProfile,
        verifyEmail,
        signInUser,
        forgotPassword,
        logOut,
        deleteAccount
    };

    return (
        <AuthContext.Provider value={userInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;