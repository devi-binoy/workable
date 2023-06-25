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
import { checkRole } from "../services/Auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email } = user;
          console.log("User Id: " + uid);
          setRole("jobseekers")
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          const { uid } = user;
          const role = await checkRole(uid);
          if(role==="employer")
          return new Promise((resolveLogout, rejectLogout) => {
            logoutUser()
              .then(() => {
                rejectLogout("Please login using Employer portal");
              })
              .catch((error) => {
                rejectLogout("Please login using Employer portal");
              });
          });
          setRole(role);
          resolve(true)
         
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const loginGoogle = () => {
    return new Promise ((resolve,reject)=>{
    signInWithPopup(auth, provider)
    .then(async(result) => {
    // The signed-in user info.
    //check if user has already signed up

    const user = result.user;
    const uid = user.uid;
    if(uid){
    const role = await checkRole(uid);
    
    if(role==="none"){
        setRole("jobseekers");
        resolve("new");
    }
    else  if(role==="employer")
    return new Promise((resolveLogout, rejectLogout) => {
        logoutUser()
          .then(() => {
            rejectLogout("Please login using Employer portal");
          })
          .catch((error) => {
            rejectLogout("Please login using Employer portal");
          });
      });
    
    setRole(role);
   // console.log(user);
    resolve("old")
    // ...
    }}).catch((error) => {
    // Handle errors here
   reject(error);
    });
});
  
}

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

  async function rolefetching(){
    if(user.uid){
    const role = await checkRole(user.uid);
    }
    setRole(role);
 }
 useEffect(() => {
  if(user!==null)
  rolefetching();


}, [user])

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
