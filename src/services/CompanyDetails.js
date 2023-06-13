import { db } from "../firebase";
import { collection, updateDoc,doc,setDoc } from "firebase/firestore";
import { storage } from "../firebase";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const addCompanyDetails = async (data,userid) => {
    const docRef = doc(db, "employers", userid);
    await setDoc(docRef, {
        userid: userid,
        companyName: data.companyName,
        companyAddress: data.address,
        numberOfEmployees: data.numberOfEmployees,
        websiteUrl: data.websiteUrl,
        logo: data.logo,
        
    }).then(()=>{
        console.log("Document written with ID: ", docRef.id);
    }
    ).catch((error)=>{
        console.error("Error adding document: ", error);
    });

    }


    export const addCompanyLogo = async (file,userid) => {
        const storageRef = ref(storage, `companyLogo/${userid}`);
        const metadata = {
            contentType: 'image/jpeg',
          };

          const uploadTask = await uploadBytes(storageRef, file, metadata);
            console.log("uploadTask",uploadTask);
            const url = await getDownloadURL(uploadTask.ref);
            console.log("url",url);
            return url;
    }

    export const updateCompanyDetails = async (data) => {
         updateProfile(auth.currentUser, {
            displayName: data.companyName,
            photoURL: data.logo,
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!");
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
        }



