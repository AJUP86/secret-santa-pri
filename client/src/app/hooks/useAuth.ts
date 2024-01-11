import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // Create a new user document
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            // Add your custom fields here
            customField: 'Custom Value',
            createdAt: serverTimestamp(),
          });
        }
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The user is automatically set in onAuthStateChanged
    } catch (error) {
      console.error('Error during sign in:', error);
      // Handle sign in errors here
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return { user, signIn, signOutUser };
};
