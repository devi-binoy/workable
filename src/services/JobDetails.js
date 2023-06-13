import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

export const addJobDetails = async (data,user) => {
    const collectionRef = collection(db, "joblistings");
    await addDoc(collectionRef, {
        JobTitle: data.JobTitle,
        JobLocation: data.JobLocation,
        SalaryRange: data.SalaryRange,
        JobType: data.JobType,
        disabilityCategory: data.disabilityCategory,
        ApplicationDeadline: data.ApplicationDeadline,
        NumberofOpenings: data.NumberofOpenings,
        jobDescription: data.jobDescription,
        experience: data.experience,
        qualification: data.qualification,
        workmode: data.workMode,     
        posted_date: serverTimestamp(), 
        numberofapplicants: 0,  
        userid: user.uid,
        companyname: user.displayName,   
        companylogo: user.photoURL,
    }).then(()=>{
        console.log("Document added");
    }
    ).catch((error)=>{
        console.error("Error adding document: ", error);
    });

    }

export const deleteJobDetails = async (id,user) => {
    await deleteDoc(doc(db, "joblistings", id));
}
