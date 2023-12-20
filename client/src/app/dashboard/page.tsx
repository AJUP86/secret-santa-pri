'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Home from '../page';
import { useSession } from 'next-auth/react';
export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const createEvent = () => {
    router.push('/dashboard/events/new');
  };

  console.log(session);
  if (!session || !session.user) {
    return <Home />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 py-2">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Secret Santa App</span>
        </h1>

        <p className="mt-3 text-2xl">Create your event and start the fun!</p>

        <div className="mt-6">
          <button onClick={createEvent} className="button-primary">
            Create Event
          </button>
        </div>
      </div>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        Made with love for the Secret Santa community.
      </footer>
    </>
  );
}
