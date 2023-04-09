// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBovAZe6YCaNDsVeb1o0-QjF4qg3NSmoZU",
  authDomain: "midterm-ecd10.firebaseapp.com",
  projectId: "midterm-ecd10",
  storageBucket: "midterm-ecd10.appspot.com",
  messagingSenderId: "470411293122",
  appId: "1:470411293122:web:a13bf329a4ae26fca9a65b",
  measurementId: "G-HEXT9S5L9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth }
export { db } 
