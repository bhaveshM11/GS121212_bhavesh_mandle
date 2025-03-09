import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDZw2KMtD7A008f2RrfUvRUd30B541jCtU",
  authDomain: "synergy-view-app.firebaseapp.com",
  projectId: "synergy-view-app",
  storageBucket: "synergy-view-app.firebasestorage.app",
  messagingSenderId: "886235894313",
  appId: "1:886235894313:web:970e3d7c4ec0c056298238",
  measurementId: "G-NZLSVY80FL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)