import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB15GwbzBcQhVGmwCuW3lXHb6_yzKiDHtE",
  authDomain: "manu-ab85c.firebaseapp.com",
  projectId: "manu-ab85c",
  storageBucket: "manu-ab85c.firebasestorage.app",
  messagingSenderId: "822445935603",
  appId: "1:822445935603:web:a69b0bdf66224e55672086",
  measurementId: "G-KLVVJSEMTV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;