import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBo63LmONrFnt2pAQXveetQnywDZCCkNAU",
//   authDomain: "ebike-2024.firebaseapp.com",
//   projectId: "ebike-2024",
//   storageBucket: "ebike-2024.firebasestorage.app",
//   messagingSenderId: "709255266285",
//   appId: "1:709255266285:web:cee39514c1aa39bf4871e4",
//   measurementId: "G-ZDB6B41M1K"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBrZzy2Z-vjYcUy_LX2sqOmxmG0FNdkIz4",
  authDomain: "testingebike.firebaseapp.com",
  projectId: "testingebike",
  storageBucket: "testingebike.firebasestorage.app",
  messagingSenderId: "37982166530",
  appId: "1:37982166530:web:e79424ae7408938259111b",
  measurementId: "G-H31GJ5NV87"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// optional: persist session across reloads
setPersistence(auth, browserLocalPersistence).catch(() => {
  /* ignore */
});
