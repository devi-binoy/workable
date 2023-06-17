//function to filter
import { db } from "../firebase";
import { collection, orderBy, getDocs, query, where, getDoc , doc} from 'firebase/firestore';



const ref = collection(db, 'joblistings');



export const fetchJobListings = async (queryobjfromfilters) => {
    const mapqueryobjtoquery = queryobjfromfilters.map((queryobj) => 
    where(queryobj.field,queryobj.operator,queryobj.value)
)
const querytoperform = query(ref,...mapqueryobjtoquery,orderBy("posted_date","desc"))
    const querySnapshot = await getDocs(querytoperform);
    const joblistings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(joblistings);
}

//filtering options dynamically

