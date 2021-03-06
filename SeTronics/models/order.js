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
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

async function getOrders() {
  const usersCol = collection(db, "orders");
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function addOrder(object) {
  try {
    await addDoc(collection(db, "orders"), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function deleteOrder(object) {
  try {
    await deleteDoc(doc(db, "orders", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribeProduct(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "orders")),
    (Snapshot) => {
      const source = Snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      Snapshot.docChanges().forEach((change) => {
        if (callback) {
          callback({ change, Snapshot });
        }
      });
    }
  );
  return unsubscribe;
}

export { getOrders, addOrder, deleteOrder, subscribeProduct };
