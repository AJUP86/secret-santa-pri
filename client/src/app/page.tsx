import { getServerSession } from 'next-auth';
import LandingPage from './landing/page';

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return <LandingPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 py-2">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Secret Santa App</span>
        </h1>

        <p className="mt-3 text-2xl">Create your event and start the fun!</p>

        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
