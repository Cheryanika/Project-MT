import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf1SkFgmmZO5hX1ODIB2L24dYOhUknxjw",
  authDomain: "abstract-translator-88317.firebaseapp.com",
  projectId: "abstract-translator-88317",
  storageBucket: "abstract-translator-88317.appspot.com",
  messagingSenderId: "182252696233",
  appId: "1:182252696233:web:47c26e2b38a5948010afb8",
  measurementId: "G-1ZGM8KH978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);