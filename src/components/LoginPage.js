import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase-config"; // Adjust path if necessary
import { getFirestore, doc, setDoc } from "firebase/firestore"; // For Firestore integration
import { useNavigate } from "react-router-dom"; // For navigation

function LoginPage() {
  const auth = getAuth(app);
  const db = getFirestore(app); // Initialize Firestore
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup name
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Signup
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Save user profile to Firestore
  const createUserProfile = async (user, displayNameOverride = "") => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || displayNameOverride || "Anonymous",
        photoURL: user.photoURL || "",
        plan: "Free", // default plan
        preferences: {},
        createdAt: new Date()
      }, { merge: true });
      console.log("✅ User profile synced to Firestore:", user.email);
    } catch (error) {
      console.error("❌ Firestore user profile error:", error);
    }
  };
  

  // Save user to localStorage
  const saveUserToLocalStorage = (user, displayNameOverride = "") => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || displayNameOverride || "Anonymous",
        photoURL: user.photoURL || ""
      })
    );
  };
  

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || password.length < 6) {
      setErrorMessage("Invalid email or password must be at least 6 characters.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await createUserProfile(user, name); // 🔥 use typed name
      saveUserToLocalStorage(user, name);
  
      setSuccessMessage("Sign-up successful! Redirecting...");
      setErrorMessage("");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  

  // Handle login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      saveUserToLocalStorage(user); // Save to localStorage
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      await createUserProfile(user); // 🔥 no override needed
      saveUserToLocalStorage(user);
  
      setSuccessMessage("Google login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  
  return (
    <div className="flex min-h-screen">
  {/* Left Section (with background image) */}
  <div
    className="hidden md:flex md:w-1/2 bg-cover bg-center"
    style={{
      backgroundImage: "url('https://a2viz-assets.s3.us-east-2.amazonaws.com/4.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-50 p-10">
      <h1 className="text-4xl font-bold mb-4">Everything you design,</h1>
      <h2 className="text-4xl font-bold mb-4">We make anything you want.</h2>
      <p className="text-lg text-center">
        Dozens of creative tools to create and generate like never before.
      </p>
    </div>
  </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">
          {isSignUp ? "Sign Up" : "Log In"} to A2 Visualization
        </h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form className="w-full max-w-sm" onSubmit={isSignUp ? handleSignup : handleEmailLogin}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-black"
            />
          )}
          <input
            type="email"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-black"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg mb-4 hover:bg-gray-800"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
          <div className="flex items-center justify-center mb-4">
            <span className="text-gray-400">OR</span>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-gray-300 text-black rounded-lg mb-4 hover:bg-gray-100"
          >
            Log In with Google
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 underline"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
