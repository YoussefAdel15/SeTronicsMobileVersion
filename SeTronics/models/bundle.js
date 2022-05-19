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

async function getBundleByName(name) {
  const bundleColumn = collection(db, "bundle");
  const que = query(bundleColumn, where("bundleName", "==", "name"));
  const productSnapShot = await getDocs(que);
  const bundleObject = productSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return bundleObject[0];
}

async function getbundles() {
  const bundlesColumn = collection(db, "bundle");
  const bundleSnapShot = await getDocs(bundle);
  const bundleObject = bundleSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return bundleObject;
}

async function addbundle(object) {
  try {
    await addDoc(collection(db, "bundle"), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function editbundle(object) {
  try {
    await setDoc(doc(db, "bundle", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function deletebundle(object) {
  try {
    await deleteDoc(doc(db, "bundle", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribebundle(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "bundle")),
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

export {
  getBundleByName,
  getbundles,
  addbundle,
  editbundle,
  deletebundle,
  subscribebundle,
};
