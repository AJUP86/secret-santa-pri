'use client';
import { signIn } from 'next-auth/react';

const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen  text-white text-center px-4 ">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to the <span className="text-blue-600">Secret Santa App</span>
          !
        </h1>
        <p className="text-xl mb-8">
          The easiest way to organize your Secret Santa event. Create an event,
          invite friends, and manage your gift exchange with ease.
        </p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </button>{' '}
      </main>
    </>
  );
};

export default LandingPage;
