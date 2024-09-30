// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, getDocs, where, limit, startAfter } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw2CyFauPSJr4j9-9l25gG3k0HAgvdmOk",
  authDomain: "frag-367e3.firebaseapp.com",
  projectId: "frag-367e3",
  storageBucket: "frag-367e3.appspot.com",
  messagingSenderId: "418331783923",
  appId: "1:418331783923:web:f62aa6af103f5cc16bfd86",
  measurementId: "G-CEBGJKBY3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);


export { db, collection, query, getDocs, where, limit, startAfter };
