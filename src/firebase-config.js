// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your official Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDI-O2nWCsbC26rWdC_77b4aAEETyheN-4",
  authDomain: "a2vizai.firebaseapp.com",           // ✅ DO NOT change to your custom domain
  projectId: "a2vizai",
  storageBucket: "a2vizai.appspot.com",            // ✅ Fixed typo from earlier
  messagingSenderId: "359331131985",
  appId: "1:359331131985:web:d186a74e164ed2aa0abe70",
  measurementId: "G-8959FM4K3Q"
};

// Initialize Firebase core
const app = initializeApp(firebaseConfig);

// Optional: initialize other Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services for use in your app
export { app, auth, db, storage, analytics };
