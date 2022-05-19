import { db } from "../firebase";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getFirestore,
} from "firebase/firestore";
import { async } from "@firebase/util";
import App from "../";

const fireStoreDB = getFirestore(App)