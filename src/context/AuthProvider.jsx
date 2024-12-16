import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


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
        return sendEmailVerification(auth, user);
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
            setLoading(false);
            console.log("Current user:", currentUser);
        });

        return () => {
            return unsubscribe();
        }
    }, [setUser, setLoading]);


    const userInfo = {
        user, setUser,
        loading, setLoading,
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