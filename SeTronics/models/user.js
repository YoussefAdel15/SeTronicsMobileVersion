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
} from "firebase/firestore";
import { async } from "@firebase/util";

async function getUserByName(name) {
  const usersColumn = collection(db, "users");
  const que = query(usersColumn, where("userName", "==", name));
  const userSnapShot = await getDocs(que);
  const userObject = userSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userObject[0];
}

async function getUsers() {
  const usersColumn = collection(db, "users");
  const userSnapShot = await getDocs(usersColumn);
  const userObject = userSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userObject;
}

async function addUser(object) {
  try {
    await addDoc(collection(db, "users"), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function editUser(object) {
  try {
    await setDoc(doc(db, "users", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function deleteUser(object) {
  try {
    await deleteDoc(doc(db, "users", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribeUser(callback) {
  const unsubscribe = onSnapshot(query(collection(db, "users")), (Snapshot) => {
    const source = Snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    Snapshot.docChanges().forEach((change) => {
      if (callback) {
        callback({ change, Snapshot });
      }
    });
  });
  return unsubscribe;
}

export {
  getUserByName,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  subscribeUser,
};
