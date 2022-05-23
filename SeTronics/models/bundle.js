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

async function getBundleByName(name) {
  console.log("get name", name);
  const collec = collection(db, "bundles");
  const mdoc = doc(db, "bundles", name);
  const doc_ref = await getDoc(mdoc);
  console.log(doc_ref.data());
  return doc_ref.data();
}

async function getBundleByID(id) {
  console.log("get id", id);
  const collec = collection(db, "bundles");
  const mdoc = doc(db, "bundles", id);
  const doc_ref = await getDoc(mdoc);
  return doc_ref.data();
}

async function getbundles() {
  const bundlesColumn = collection(db, "bundles");
  const bundleSnapShot = await getDocs(bundlesColumn);
  const bundleObject = bundleSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return bundleObject;
}

async function addbundle(object) {
  try {
    await addDoc(collection(db, "bundles"), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function editbundle(object) {
  try {
    await setDoc(doc(db, "bundles", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function deletebundle(object) {
  try {
    await deleteDoc(doc(db, "bundles", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribebundle(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "bundles")),
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
  getBundleByID,
};
