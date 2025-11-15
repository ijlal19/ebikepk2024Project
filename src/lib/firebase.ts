import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyBrZzy2Z-vjYcUy_LX2sqOmxmG0FNdkIz4",
//   authDomain: "testingebike.firebaseapp.com",
//   projectId: "testingebike",
//   storageBucket: "testingebike.firebasestorage.app",
//   messagingSenderId: "37982166530",
//   appId: "1:37982166530:web:e79424ae7408938259111b",
//   measurementId: "G-H31GJ5NV87"
// };

// indutrialandcommercials@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyDeH3szAmq7tHBtX0p5xN5MX1BbXpr3wx8",
  authDomain: "ebikepk-b5fa9.firebaseapp.com",
  projectId: "ebikepk-b5fa9",
  storageBucket: "ebikepk-b5fa9.firebasestorage.app",
  messagingSenderId: "109022209927",
  appId: "1:109022209927:web:6e75bdf13d3826fa66d522",
  measurementId: "G-8JSYYQ10Q8"
};


export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// optional: persist session across reloads
setPersistence(auth, browserLocalPersistence).catch(() => {
  /* ignore */
});
