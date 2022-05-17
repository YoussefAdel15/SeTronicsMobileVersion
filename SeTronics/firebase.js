// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalystics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVdvBkqR34C-nonBmqbwfItlN1BLSZso0",
  authDomain: "cs303-final.firebaseapp.com",
  projectId: "cs303-final",
  storageBucket: "cs303-final.appspot.com",
  messagingSenderId: "295198998143",
  appId: "1:295198998143:web:14314bd470c67cca4bc94a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
