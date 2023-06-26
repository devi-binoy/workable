import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const setSeeker = async (data, userId) => {
  const docRef = doc(db, "jobseekers", userId);
  await setDoc(docRef, {
    name: data.name,
    dob: data.dob,
    gender: data.gender,
    resumeLink: data.resumeLink,
    contactNumber: data.contactNumber,
    disabilityCategory: data.disabilityCategory,
    email: data.email,
    address: data.address,
    experience: data.experience,
    qualification: data.qualification,
  })
};

export const getSeeker = async (userId) => {
  const docRef = doc(db, "jobseekers", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching job seeker: ", error);
    return null;
  }
};