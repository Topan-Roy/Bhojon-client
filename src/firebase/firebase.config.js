
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBmuNozn0SjNtRwZXUsKNNdcJgWiNTaQ30",
//   authDomain: "bhajon-3d8a3.firebaseapp.com",
//   projectId: "bhajon-3d8a3",
//   storageBucket: "bhajon-3d8a3.firebasestorage.app",
//   messagingSenderId: "1030524280649",
//   appId: "1:1030524280649:web:430fb6f7eb2c86b9b0c498"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);