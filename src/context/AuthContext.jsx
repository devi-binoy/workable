import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email } = user;
          console.log("User Id: " + uid);
          setDoc(doc(db, "jobseekers", uid), { email }) 
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

          const docRef = doc(db, "jobseekers", uid); 
          getDoc(docRef) // 
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data();
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
          resolve(true);
          // ...
        })
        .catch((error) => {
          // Handle errors here
          reject(error);
        });
    });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened
      });
  };

   useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      },
      (error) => {
        setErrorMessage(error.message);
      }
    );
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, loginUser, logoutUser, loginGoogle, user}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
