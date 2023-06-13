import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, provider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});



    const createUser = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const { uid, email } = user;

                    db.collection("applicants").doc(uid).set({ email })
                        .then(() => {
                            resolve(true);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const { uid } = user;

                    firestore.collection("applicants").doc(uid).get()
                        .then((doc) => {
                            if (doc.exists) {
                                const userData = doc.data();
                                console.log(userData.email);
                            }

                            resolve(true);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const loginGoogle = () => {
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user);
                    resolve(true)
                    // ...
                }).catch((error) => {
                    // Handle errors here
                    reject(error);
                });
        });

    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened

        });
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        }
        );

    }, [user])

    return (
        <UserContext.Provider value={{ createUser, loginUser, logoutUser, loginGoogle, user }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
}
