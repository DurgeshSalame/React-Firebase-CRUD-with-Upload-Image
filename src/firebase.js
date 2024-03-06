// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
import{getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-6wuQFUochkR1FVaZN3nY1D9Wo43lsqk",
  authDomain: "feedback-9e26f.firebaseapp.com",
  projectId: "feedback-9e26f",
  storageBucket: "feedback-9e26f.appspot.com",
  messagingSenderId: "62346297209",
  appId: "1:62346297209:web:5e6583f2a36d52c74239a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const storage = getStorage(app)