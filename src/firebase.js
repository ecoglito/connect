import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASeykgObRcPbiILcYY9vdRduk4wNL_xrY",
  authDomain: "alchemy-demo-cd06d.firebaseapp.com",
  projectId: "alchemy-demo-cd06d",
  storageBucket: "alchemy-demo-cd06d.appspot.com",
  messagingSenderId: "67560013475",
  appId: "1:67560013475:web:5be03788ca0aea96df8916",
  measurementId: "G-LZQ3222T0K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth};

