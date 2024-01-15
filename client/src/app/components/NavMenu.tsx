'use client';
import Link from 'next/link';

import useAuth from '../hooks/useAuth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const AuthButton = () => {
  const { user, signIn, signOutUser } = useAuth();
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/login');
  };

  return user ? (
    <div className="flex items-center space-x-2">
      <span>{user.displayName}</span>
      <button onClick={signOutUser} className="button-secondary">
        Sign out
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <span>Not Signed in</span>
      <button
        onClick={handleSignIn}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sign In
      </button>
    </div>
  );
};

export default function NavMenu() {
  const { user } = useAuth();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={user ? '/dashboard' : '/'}
          className="text-xl font-semibold hover:text-gray-300 transition duration-300"
        >
          Secret Santa App
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
