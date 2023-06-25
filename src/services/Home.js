import { db } from "../firebase";
import {
  collection,
  orderBy,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

const ref = collection(db, "joblistings");
const pageLimit = 4;

// export const fetchJobListings = async (sortBy, filterConditions) => {
//   let orderByField = "posted_date";
//   let hasSalarySort = false;
//   let hasSalaryFilter = false;

//   if (sortBy) {
//     if (sortBy === "salary") {
//       orderByField = "SalaryRange";
//       hasSalarySort = true;
//     } else if (sortBy === "openings") {
//       orderByField = "NumberofOpenings";
//     }
//   }

//   let queryRef = query(ref);
//   let totalCount = 0;

//   if (filterConditions && filterConditions.length > 0) {
//     filterConditions.forEach((filter) => {
//       if (filter.field === "SalaryRange") {
//         hasSalaryFilter = true;
//         queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
//       } else {
//         queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
//       }
//     });
//   }

//   if (hasSalaryFilter && hasSalarySort) {
//     queryRef = query(queryRef, orderBy("SalaryRange", "desc"));
//   } 
//   else if (hasSalaryFilter) {
//     queryRef = query(queryRef, orderBy("SalaryRange", "desc"), orderBy(orderByField, "desc"));
//   }
//   else {
//     queryRef = query(queryRef, orderBy(orderByField, "desc"));
//   }

//   try {
//     totalCount = await fetchTotalCount(queryRef);
//     queryRef = query(queryRef, limit(pageLimit));
//     const querySnapshot = await getDocs(queryRef);
//     const jobListings = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//     return {
//       jobListings,
//       lastVisible,
//       totalCount,
//     };
//   } catch (error) {
//     console.error("Error fetching sorted job listings:", error);
//     return {
//       jobListings: [],
//       lastVisible: null,
//       totalCount,
//     };
//   }
// };

// export const fetchNextPage = async (lastVisible, sortBy, filterConditions) => {
//   let orderByField = "posted_date";
//   let hasSalaryFilter = false;
//   let hasSalarySort = false;

//   if (sortBy) {
//     if (sortBy === "salary") {
//       orderByField = "SalaryRange";
//       hasSalarySort = true;
//     } else if (sortBy === "openings") {
//       orderByField = "NumberofOpenings";
//     }
//   }

//   let queryRef = query(ref);

//   if (filterConditions && filterConditions.length > 0) {
//     filterConditions.forEach((filter) => {
//       if (filter.field === "SalaryRange") {
//         hasSalaryFilter = true;
//         queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
//       } else {
//         queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
//       }
//     });
//   }

//   if (hasSalaryFilter && hasSalarySort) {
//     queryRef = query(queryRef, orderBy("SalaryRange", "desc"), orderBy(orderByField, "desc"));
//   } else if (hasSalaryFilter) {
//     queryRef = query(queryRef, orderBy("SalaryRange", "desc"), orderBy(orderByField, "desc"));
//   } else {
//     queryRef = query(queryRef, orderBy(orderByField, "desc"));
//   }

//   queryRef = query(queryRef, startAfter(lastVisible)); 
//   try {
//     const querySnapshot = await getDocs(queryRef);

//     const jobListings = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return {
//       jobListings,
//       lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
//     };
//   } catch (error) {
//     console.error("Error fetching sorted job listings:", error);
//     return {
//       jobListings: [],
//       lastVisible: null,
//     };
//   }
// };

export const fetchJobListings = async (sortBy, filterConditions) => {
  let orderByField = "posted_date";
  let hasDateSort = true;
  let hasDateFilter = false;

  if (sortBy) {
    if (sortBy === "salary") {
      orderByField = "SalaryRange";
      hasDateSort = false;
    } else if (sortBy === "openings") {
      orderByField = "NumberofOpenings";
      hasDateSort = false;
    }
  }

  let queryRef = query(ref);
  let totalCount = 0;

  if (filterConditions && filterConditions.length > 0) {
    filterConditions.forEach((filter) => {
      if (filter.field === "posted_date") {
        hasDateFilter = true;
        queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
      } else {
        queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
      }
    });
  }

  if (hasDateFilter && hasDateSort) {
    queryRef = query(queryRef, orderBy("posted_date", "desc"));
  } else if (hasDateFilter) {
    queryRef = query(queryRef, orderBy("posted_date", "desc"), orderBy(orderByField, "desc"));
  } else {
    queryRef = query(queryRef, orderBy(orderByField, "desc"));
  }

  try {
    totalCount = await fetchTotalCount(queryRef);
    const querySnapshot = await getDocs(queryRef);
    const jobListings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      jobListings,
      lastVisible,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching sorted job listings:", error);
    return {
      jobListings: [],
      lastVisible: null,
      totalCount,
    };
  }
};

export const fetchNextPage = async (lastVisible, sortBy, filterConditions) => {
  let orderByField = "posted_date";
  let hasDateSort = true;
  let hasDateFilter = false;

  if (sortBy) {
    if (sortBy === "salary") {
      orderByField = "SalaryRange";
      hasDateSort = false;
    } else if (sortBy === "openings") {
      orderByField = "NumberofOpenings";
      hasDateSort = false;
    }
  }

  let queryRef = query(ref);

  if (hasDateFilter) {
    queryRef = query(queryRef, where("posted_date", ">", lastVisible.data().posted_date), orderBy("posted_date", "desc"));
  } else {
    queryRef = query(queryRef, orderBy(orderByField, "desc"), startAfter(lastVisible));
  }

  if (filterConditions && filterConditions.length > 0) {
    filterConditions.forEach((filter) => {
      if (filter.field === "posted_date") {
        hasDateFilter = true;
        queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
      } else {
        queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
      }
    });
  }

  queryRef = query(queryRef, limit(pageLimit)); // Apply the limit here

  try {
    const querySnapshot = await getDocs(queryRef);

    const jobListings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      jobListings,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching sorted job listings:", error);
    return {
      jobListings: [],
      lastVisible: null,
    };
  }
};

  


export const fetchTotalCount = async (queryRef) => {
  try {
    const snapshot = await getCountFromServer(queryRef);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching total count:", error);
    return 0;
  }
};
