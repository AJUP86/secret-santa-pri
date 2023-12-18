'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AuthButton = () => {
  const { data: session } = useSession();
  const GoHome = () => {
    signOut();
    redirect('api/auth/signin');
  };
  return session ? (
    <div className="flex items-center space-x-2">
      <span>{session.user.name}</span>
      <button onClick={GoHome} className="button-secondary">
        Sign out
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <span>Not Signed in</span>
      <button
        onClick={() => signIn()}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sign In
      </button>
    </div>
  );
};

export default function NavMenu() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a className="text-xl font-semibold hover:text-gray-300 transition duration-300">
            Secret Santa App
          </a>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
