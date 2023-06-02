import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANjRwD95E5-wexzTnQ3sEQiTI7EO6mFTs",
  authDomain: "micro-blogging-project-6237e.firebaseapp.com",
  databaseURL:
    "https://micro-blogging-project-6237e-default-rtdb.firebaseio.com",
  projectId: "micro-blogging-project-6237e",
  storageBucket: "micro-blogging-project-6237e.appspot.com",
  messagingSenderId: "685796154336",
  appId: "1:685796154336:web:f9722fc11f509af43fa985",
  measurementId: "G-XT7FGYFFZG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const storage = getStorage(app);

export { db, app, auth, provider, storage };

// get collection data
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
  alert("File Uploaded!");
}
