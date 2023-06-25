import { db } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
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
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  await updateDoc(joblistingRef, {
    numberofapplicants: increment(1),
  })
    .then(() => {
      console.log("Number of applicants updated in joblistings collection");
    })
    .catch((error) => {
      console.error("Error updating number of applicants: ", error);
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

    const joblistingIds = [];
    const applicationSnapshots = [];

    applicantSnapshot.forEach((doc) => {
      const { joblistingId } = doc.data();
      joblistingIds.push(joblistingId);
      applicationSnapshots.push(
        getDocs(
          query(
            collection(db, "applicants"),
            where("joblistingId", "==", joblistingId),
            limit(1)
          )
        )
      );
    });

    const jobDetails = [];

    const applicationResults = await Promise.all(applicationSnapshots);

    for (let i = 0; i < joblistingIds.length; i++) {
      const joblistingId = joblistingIds[i];
      const joblistingDoc = await getDoc(doc(db, "joblistings", joblistingId));
      if (joblistingDoc.exists()) {
        const jobData = joblistingDoc.data();
        const applicationSnapshot = applicationResults[i];
        if (!applicationSnapshot.empty) {
          const applicationDoc = applicationSnapshot.docs[0];
          const { status } = applicationDoc.data();
          jobData.status = status;
        }
        jobDetails.push(jobData);
      }
    }

    console.log("Job details for applied listings:", jobDetails);
    return jobDetails;
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
