// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAwPqGhSP1DZOdael59BXiAAsGkRkdQy8g",
  authDomain: "mobileno-verifier.firebaseapp.com",
  projectId: "mobileno-verifier",
  storageBucket: "mobileno-verifier.firebasestorage.app",
  messagingSenderId: "142740933935",
  appId: "1:142740933935:web:d160c486317a6b94fda5da"
};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app)
