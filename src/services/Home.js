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

export const fetchJobListings = async (queryobjfromfilters) => {
  const mapqueryobjtoquery = queryobjfromfilters.map((queryobj) =>
    where(queryobj.field, queryobj.operator, queryobj.value)
  );
  const querytoperform = query(
    ref,
    ...mapqueryobjtoquery,
    orderBy("posted_date", "desc"),
    limit(pageLimit)
  );
  const querySnapshot = await getDocs(querytoperform);
  const joblistings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(joblistings);

  return {
    joblistings,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const fetchInitialPage = async () => {
  const querySnapshot = await getDocs(
    query(ref, orderBy("posted_date", "desc"), limit(pageLimit))
  );
  const joblistings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(joblistings);

  return {
    joblistings,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const fetchNextPage = async (lastDocument) => {
  const querySnapshot = await getDocs(
    query(
      ref,
      orderBy("posted_date", "desc"),
      startAfter(lastDocument),
      limit(pageLimit)
    )
  );
  const jobListings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(jobListings);

  return {
    jobListings,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const fetchSortedJobListings = async (sortBy) => {
  let orderByField = "posted_date";

  if (sortBy === "salary") {
    orderByField = "SalaryRange";
  } else if (sortBy === "openings") {
    orderByField = "NumberOfOpenings";
  }

  try {
    const querySnapshot = await getDocs(
      query(ref, orderBy(orderByField, "desc"), limit(pageLimit))
    );

    const jobListings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(jobListings);

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

export const fetchTotalCount = async () => {
  const q = query(ref);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};