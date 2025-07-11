import { db } from "./firebase-config";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

// Add a new user to Firestore
export const createUserProfile = async (user) => {
  try {
    const userDocRef = doc(usersCollectionRef, user.id);
    await setDoc(userDocRef, {
      ...user,
      createdAt: new Date(),
    });
    console.log("User profile created:", user);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

// Get all users (optional for admin features)
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(usersCollectionRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
