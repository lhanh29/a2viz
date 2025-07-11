// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI-O2nWCsbC26rWdC_77b4aAEETyheN-4",
  authDomain: "a2vizai.firebaseapp.com",
  projectId: "a2vizai",
  storageBucket: "a2vizai.appspot.com",
  messagingSenderId: "359331131985",
  appId: "1:359331131985:web:d186a74e164ed2aa0abe70",
  measurementId: "G-8959FM4K3Q"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Analytics (optional, can be removed if unused)
const analytics = getAnalytics(app);

// ✅ Firebase Authentication
const auth = getAuth(app);

// ✅ Google Auth Provider setup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export { app, auth, provider, analytics };
