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

export const fetchJobListings = async (sortBy, filterConditions) => {
  let orderByField = "posted_date";

  if (sortBy) {
    if (sortBy === "salary") {
      orderByField = "SalaryRange";
    } else if (sortBy === "openings") {
      orderByField = "NumberofOpenings";
    }
  }

  let queryRef = query(ref, orderBy(orderByField, "desc"));
  let totalCount = 0;

  if (filterConditions && filterConditions.length > 0) {
    filterConditions.forEach((filter) => {
      queryRef = query(
        queryRef,
        where(filter.field, filter.operator, filter.value),
      );
    });
  }

  try {
    totalCount = await fetchTotalCount(queryRef);
    queryRef = query(queryRef, limit(pageLimit));
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

  if (sortBy) {
    if (sortBy === "salary") {
      orderByField = "SalaryRange";
    } else if (sortBy === "openings") {
      orderByField = "NumberofOpenings";
    }
  }

  let queryRef = query(ref, orderBy(orderByField, "desc"), startAfter(lastVisible), limit(pageLimit));

  if (filterConditions && filterConditions.length > 0) {
    filterConditions.forEach((filter) => {
      queryRef = query(
        queryRef,
        where(filter.field, filter.operator, filter.value)
      );
    });
  }

  
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