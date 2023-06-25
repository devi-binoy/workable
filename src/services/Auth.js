import { db } from "../firebase";
import {collection,doc,getDoc} from "firebase/firestore";

export function checkRole (uid) {
    return new Promise(async (resolve, reject) => {
        try {
        const docRef = doc(db, "employers", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("employer")
            resolve("employer");
        }
        else{
            const docRef = doc(db, "jobseekers", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("jobseekers")
                resolve("jobseekers");
            }
        }

       
        resolve("none");
    } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }