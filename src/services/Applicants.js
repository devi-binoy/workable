import { collection} from 'firebase/firestore';
import { db } from "../firebase";
const ref = collection(db, 'joblistings'); 