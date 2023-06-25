import { db } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
  limit,
} from "firebase/firestore";
import { increment } from "firebase/firestore";

export const apply = async (data, userid) => {
  const joblistingRef = doc(db, "joblistings", data.joblistingId);
  const joblistingSnapshot = await getDoc(joblistingRef);
  const joblistingData = joblistingSnapshot.data();
  const isDisabilityIncluded = data.disabilityCategory.some((disability) =>
    joblistingData.disabilityCategory.includes(disability)
  );
  if (!isDisabilityIncluded) {
    return false;
  }

  const applicantsCollectionRef = collection(db, "applicants");
  await addDoc(applicantsCollectionRef, {
    userid: data.userid,
    joblistingId: data.joblistingId,
    jobTitle: data.jobTitle,
    companyId: data.companyId,
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
    coverLetter: data.coverLetter,
    applied_date: serverTimestamp(),
    status: "Applied",
  })
    .then((docRef) => {
    })
    .catch((error) => {

    });
  return true;
};

export const getApplied = async (userid) => {
  try {
    const applicantsQuery = query(
      collection(db, "applicants"),
      where("userid", "==", userid)
    );
    const applicantSnapshot = await getDocs(applicantsQuery);
    const appliedListings = [];

    for (const temp of applicantSnapshot.docs) {
      const applicantData = temp.data();
      const jobDocRef = doc(db, "joblistings", applicantData.joblistingId);
      const jobDocSnapshot = await getDoc(jobDocRef);
      
      if (jobDocSnapshot.exists()) {
        const jobData = jobDocSnapshot.data();
        const listing = {
          ...applicantData,
          id: doc.id,
          ...jobData
        };
        appliedListings.push(listing);
      }
    }
    return appliedListings;
  } catch (error) {
    console.error("Error fetching applied job details:", error);
    return [];
  }
};

export const hasApplied = async (userId, jobId) => {
  try {
    const applicantsQuery = query(
      collection(db, "applicants"),
      where("userid", "==", userId),
      where("joblistingId", "==", jobId)
    );
    const applicantSnapshot = await getDocs(applicantsQuery);

    return !applicantSnapshot.empty;
  } catch (error) {
    console.error("Error checking application:", error);
    throw error;
  }
};
