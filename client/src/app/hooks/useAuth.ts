'use client';
import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import {
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // This listener is responsible for setting or clearing the user state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        console.log(firebaseUser);
        setUser(firebaseUser);
        router.push('/dashboard');
        handleCreateUser(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
        router.push('/login');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  const handleCreateUser = async (user) => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          // Add any other event fields here
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      //router.push(`/dashboard/events/${data.eventId}`); // Redirect to the event page, using the returned event ID
    } catch (error) {
      console.error('Error creating user', error);
      // Handle errors, such as displaying an error message to the user
    }
  };
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      // Sign in with popup and let onAuthStateChanged handle the user state
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const signOutUser = async () => {
    try {
      // Sign out and let onAuthStateChanged handle the user state
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return { user, signIn, signOutUser };
};

export default useAuth;
