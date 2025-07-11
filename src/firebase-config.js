// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChM8qXf-AF75_GzVDIwhEg9owTJmf8aVE",
  authDomain: "a2vizai.firebaseapp.com",
  projectId: "a2vizai",
  storageBucket: "a2vizai.appspot.com",
  messagingSenderId: "359331131985",
  appId: "1:359331131985:web:d186a74e164ed2aa0abe70",
  measurementId: "G-8959FM4K3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
