// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXEP8wJVJloGZZMTWEv-KTGaTdlGNMjR8",
  authDomain: "iathair.firebaseapp.com",
  projectId: "iathair",
  storageBucket: "iathair.appspot.com",
  messagingSenderId: "448424004466",
  appId: "1:448424004466:web:5fb35399ae598f0ff7abeb",
  measurementId: "G-652B3MNP8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
